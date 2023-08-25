import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongoosError.js";
const categoryList = [
  "Ordinary Drink",
  "Cocktail",
  "Snake",
  "Other/Unknow",
  "Cocoa",
  "Shot",
  "Coffee/Tea",
  "Other/Unknow",
  "Homemade Liqueur",
  "Punch / Party Drink",
  "Beer",
  "Soft Drink",
];

const glassList = [
  "Highball glass",
  "Cocktail glass",
  "Old-fashioned",
  "Whiskey Glass",
  "Collins glass",
  "Pousse cafe glass",
  "Champagne flute",
  "Whiskey sour glass",
  "Cordial glass",
  "Brandy snifter",
  "White wine glass",
];

const CocktailSchema = new Schema(
  {
    drink: { type: String, required: [true, "Set name for contact"] },
    category: { type: String, enum: categoryList, required: [true, "Set Category"] },
    glass: { type: String, enum: glassList, required: [true, "Set Glass Type"] },
    instructions: { type: String, required: [true, "Set Instructions"] },
    ingredients: { type: Array, required: [true, "Add Ingredient"] },
    favs: { type: Array, default: [] },
    drinkThumb: { type: String, required: [true, "Photo is requiered"] },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false },
);

CocktailSchema.post("save", handleMongooseError);
export const Cocktail = model("cocktail", CocktailSchema);

// export const addCocktailSchema = Joi.object({
//   drink: Joi.string().required(),
//   category: Joi.string().valid(...categoryList).required(),
//   glass: Joi.string().valid(...glassList).required(),
//   instructions: Joi.string().required(),
//   drinkThumb: Joi.string().required(),

//   ingredients: Joi.array().items({
//         _id: Joi.string().required(),
//         title: Joi.string().required(),
//         ingredientThumb: Joi.string().required(),
//         "thumb-medium": Joi.string().required(),
//         "thumb-small": Joi.string().required(),
//   }),
// });

// export const updateFavoriteSchema = Joi.object({
//   id: Joi.string().required(),
// });
