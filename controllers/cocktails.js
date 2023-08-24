import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";
import { Cocktail } from "../models/cocktail.js";
import { Category } from "../models/categorie.js"
import { Ingredient } from "../models/Ingredient.js"

// get all Cocktails
const getAllCocktails = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Cocktail.find({}, null, { skip, limit });
    res.status(200).json(result);
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
      const result = await Category.find({});
      res.status(200).json(result);
  };

//get all ingredients
const  getIngredients = async (req, res) => {
  const result = await Ingredient.find({});
  res.status(200).json(result);
};

//get top-cocktails
const  getTopCocktails = async (req, res) => {
  // const result = await Ingredient.find({});
  console.log(result)
  res.status(200).json(result);

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
  getCategories : ctrlWrapper(getCategories),
  getIngredients : ctrlWrapper(getIngredients),
  getTopCocktail: ctrlWrapper(getTopCocktail),
//   AddCocktail: ctrlWrapper(AddCocktail),
//   deleteCocktail: ctrlWrapper(deleteCocktail),
};

//export
export default ctrl;
