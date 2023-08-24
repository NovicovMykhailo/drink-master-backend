// import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";
import { Cocktail } from "../models/cocktail.js";

// get all Cocktails
const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   if (req.query.hasOwnProperty("favorite")) {
    
//     const { favorite } = req.query;
//     const result = await Cocktail.find({ owner }, "-owner").where({ favorite });
//     res.status(200).json(result);
//   } else {
    const { page = 1, limit = 9 } = req.query;
    const skip = (page - 1) * limit;

    const result = await Cocktail.find({}, null, { skip, limit });
    res.status(200).json(result);
//   }
};


// // ============

// // //get Cocktail by id
// const getById = async (req, res) => {
//   const { CocktailId } = req.params;
//   const Cocktail = await Cocktail.findById(CocktailId);

//   if (!Cocktail) throw HttpError(404, "Not Found");

//   res.status(200).json(Cocktail);
// };

// //add Cocktail
// const AddCocktail = async (req, res) => {
//   const { _id: owner } = req.user;

//   const addedCocktail = await Cocktail.create({ ...req.body, owner });

//   res.status(201).json(addedCocktail);
// };

// //update Cocktail id
// const modifyCocktail = async (req, res) => {
//   const { CocktailId } = req.params;

//   const updatedCocktail = await Cocktail.findByIdAndUpdate(CocktailId, req.body, { new: true });
//   if (!updatedCocktail) throw HttpError(404, "Not found");

//   res.status(200).json(updatedCocktail);
// };

// // update Cocktail Status by id
// const updateStatusCocktail = async (req, res) => {
//   const { CocktailId } = req.params;

//   const updatedCocktail = await Cocktail.findByIdAndUpdate(CocktailId, req.body, { new: true });
//   if (!updatedCocktail) throw HttpError(404, "Not found");

//   res.status(200).json(updatedCocktail);
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
  getAll: ctrlWrapper(getAll),
//   getById: ctrlWrapper(getById),
//   AddCocktail: ctrlWrapper(AddCocktail),
//   modifyCocktail: ctrlWrapper(modifyCocktail),
//   deleteCocktail: ctrlWrapper(deleteCocktail),
//   updateStatusCocktail: ctrlWrapper(updateStatusCocktail),
};

//export
export default ctrl;
