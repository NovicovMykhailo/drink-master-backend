import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";
import { Cocktail } from "../models/cocktail.js";
import { Category } from "../models/category.js";
import { Glass } from "../models/glass.js";
import { Ingredient } from "../models/Ingredient.js";
import { nanoid } from "nanoid";

// get all Cocktails
const getAllCocktails = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Cocktail.find({}, null, { skip, limit });
  const total = await Cocktail.countDocuments({}).exec()
  const response = [
    {page:Number(page), total},
    {items: result || {}}
  ]
  //{page: 1, total: Cocktail.}
  res.status(200).json(response);
  //   }
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
        items: result
      }
      return obj;
    })
  );
  res.status(200).json(sortedCocktails);
};




//add Cocktail
// const AddCocktail = async (req, res) => {
//   const { _id: owner } = req.user;
//   const addedCocktail = await Cocktail.create({ ...req.body, owner });
//   res.status(201).json(addedCocktail);
// };

// //delete Cocktail by id
// const deleteCocktail = async (req, res) => {
//   const { CocktailId } = req.params;
//   const deletedCocktail = await Cocktail.findByIdAndRemove(CocktailId);
//   if (!deletedCocktail) throw HttpError(404, "Not Found");
//   res.status(200).json({ message: "Cocktail deleted" });
// };

//decotations of all methods
const ctrl = {
  getAllCocktails: ctrlWrapper(getAllCocktails),
  getCocktailById: ctrlWrapper(getCocktailById),
  getCategories: ctrlWrapper(getCategories),
  getIngredients: ctrlWrapper(getIngredients),
  getTopCocktails: ctrlWrapper(getTopCocktails),
  getGlasses: ctrlWrapper(getGlasses),
  //   AddCocktail: ctrlWrapper(AddCocktail),
  //   deleteCocktail: ctrlWrapper(deleteCocktail),
};

//export
export default ctrl;
