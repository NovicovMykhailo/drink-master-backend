import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";
import { Cocktail } from "../models/cocktail.js";
import { Category } from "../models/category.js";
import { Glass } from "../models/glass.js";
import { Ingredient } from "../models/Ingredient.js";
import { nanoid } from "nanoid";

// get all Cocktails with pagination
const getAllCocktails = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Cocktail.find({}, null, { skip, limit });
  const total = await Cocktail.countDocuments({});

  const response = {
    count: {
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total: total,
    },
    data: result || [],
  };

  res.status(200).json(response);
};

//get Cocktail by id
const getCocktailById = async (req, res) => {
  const { cocktailId } = req.params;
  const result = await Cocktail.findById(cocktailId);
  if (!result) throw HttpError(404, "Not Found");
  res.status(200).json(result);
};

//get all categories
const getCategories = async (req, res) => {
  const result = await Category.find({}).sort({ name: "asc" });
  res.status(200).json(result);
};

//get all ingredients
const getIngredients = async (req, res) => {
  const result = await Ingredient.find({});
  res.status(200).json(result);
};

// get all glasses
const getGlasses = async (req, res) => {
  const result = await Glass.find({}).sort({ name: "asc" });
  res.status(200).json(result);
};

// // get top-cocktails
const getTopCocktails = async (req, res) => {
  const categories = await Category.find({}).sort({ name: "asc" });

  const sortedCocktails = await Promise.all(
    categories.map(async ({ name }) => {
      const result = await Cocktail.find({ category: name }).limit(3);
      const obj = {
        category: name,
        _id: nanoid(),
        items: result,
      };
      return obj;
    }),
  );
  res.status(200).json(sortedCocktails);
};

// search by querry with pagination
const getCocktailsByQuerry = async (req, res) => {
  const { q, category, ingredient, page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const categories = await Cocktail.find({})
    .find(q ? { $or: [{ drink: { $regex: q, $options: "i" } }, { category: { $regex: q, $options: "i" } }] } : {})
    .find(category ? { category: { $regex: category, $options: "i" } } : {})
    .find(ingredient ? { $or: [{ "ingredients.title": ingredient }] } : {})
    .skip(skip);

  const filteredCategories = {
    count: {
      page: Number(page),
      totalPages: Math.ceil(categories.length / limit),
      total: categories.length,
    },
    data: categories.slice(0, limit),
  };
  res.status(200).json(filteredCategories);
};

//add to favs
const addToFavs = async (req, res) => {
  const { _id } = req.user;
  const { cocktailId } = req.body;

  if (!cocktailId) {
    throw HttpError(400, "cocktail id is reguired");
  }

  const { favs } = await Cocktail.findById(cocktailId);
  if (favs.includes(_id)) throw HttpError(400, "cocktail is alrady in favorites");

  await Cocktail.findByIdAndUpdate({ _id: cocktailId }, { $push: { favs: _id } });
  res.status(201).json({ message: "added to favs" });
};

//remove from favs
const removeFromFavs = async (req, res) => {
  const { _id } = req.user;
  const { cocktailId } = req.body;
  if (!cocktailId) {
    throw HttpError(400, "cocktail id is reguired");
  }
  const { favs } = await Cocktail.findById(cocktailId);
  if (!favs.includes(_id)) throw HttpError(404, "cocktail is not in favorites yet");

  await Cocktail.findByIdAndUpdate({ _id: cocktailId }, { $pull: { favs: _id } });
  res.status(200).json({ message: "removed from fav" });
};

//get Favs by user with pagination
const getFavsByUser = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const response = await Cocktail.find({
    favs: { $all: [`${_id}`] },
  }).skip(skip);

  const foundCocktails = {
    count: {
      page: Number(page),
      totalPages: Math.ceil(response.length / limit),
      total: response.length,
    },
    data: response.slice(0, limit),
  };
  res.status(200).json(foundCocktails);
};

//get popular by Favs Length
const getPopularRecipe = async (req, res) => {
  const result = await Cocktail.find({ favs: { $exists: true } })
    .sort({ favs: 1 })
    .limit(4);
  res.status(200).json(result);
};

//get own recipies /// add pagination
const getOwnRecipes = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Cocktail.find({ owner: { $exists: true } }).skip(skip);

  const ownedRecipes = {
    count: {
      page: Number(page),
      totalPages: Math.ceil(result.length / limit),
      total: result.length,
    },
    data: result.slice(0, limit),
  };

  res.status(200).json(ownedRecipes);
};

//add addOwnRecipe
const addOwnRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  if (req.file?.path) {
    const drinkThumb = req.file.path;
    const addedCocktail = await Cocktail.create({ ...req.body, owner, drinkThumb });
    res.status(201).json(addedCocktail);
  } else {
    throw HttpError(400, "image is required in field /recipeImg/");
  }
};

//delete removeOwnRecipe by id
const removeOwnRecipe = async (req, res) => {
  const { cocktailId } = req.body;
  const { _id } = req.user;


  const { owner } = await Cocktail.findById({ _id: cocktailId });
  if (owner.toString() !== _id.toString()) {
    throw HttpError(403, "This user cannot delete other owners' recipes");
  }
  if (!owner) {
    throw HttpError(404, "Not Found");
  }
  if (owner.toString() === _id.toString()) {

    const deletedResipe = await Cocktail.findByIdAndRemove({_id: cocktailId});
    res.status(200).json([{ message: "Cocktail deleted" }, deletedResipe]);
  }

};

//decotations of all methods
const ctrl = {
  getAllCocktails: ctrlWrapper(getAllCocktails),
  getCocktailById: ctrlWrapper(getCocktailById),
  getCategories: ctrlWrapper(getCategories),
  getIngredients: ctrlWrapper(getIngredients),
  getTopCocktails: ctrlWrapper(getTopCocktails),
  getGlasses: ctrlWrapper(getGlasses),
  getCocktailsByQuerry: ctrlWrapper(getCocktailsByQuerry),
  getFavsByUser: ctrlWrapper(getFavsByUser),
  getPopularRecipe: ctrlWrapper(getPopularRecipe),
  addToFavs: ctrlWrapper(addToFavs),
  removeFromFavs: ctrlWrapper(removeFromFavs),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  removeOwnRecipe: ctrlWrapper(removeOwnRecipe),
};

//export
export default ctrl;
