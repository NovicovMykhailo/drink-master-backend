import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongoosError.js";
import { categoryList } from "../contentValues/calegories.js";
import { glassList } from "../contentValues/glasses.js";

const CocktailSchema = new Schema(
  {
    drink: { type: String, required: [true, "Set name for contact"] },
    drinkAlternate: { type: String, default: null },
    tags: { type: String, default: null },
    video: { type: String, default: null },
    IBA: { type: String, default: null },
    alcoholic: { type: String, default: "Alcoholic" },
    category: { type: String, enum: categoryList, required: [true, "Set Category"] },
    glass: { type: String, enum: glassList, required: [true, "Set Glass Type"] },
    instructions: { type: String, required: [true, "Set Instructions"] },
    instructionsES: { type: String, default: null },
    instructionsDE: { type: String, default: null },
    instructionsFR: { type: String, default: null },
    instructionsIT: { type: String, default: null },
    instructionsRU: { type: String, default: null },
    instructionsPL: { type: String, default: null },
    instructionsUK: { type: String, default: null },
    ingredients: { type: Array, required: [true, "Add Ingredient"] },
    favs: { type: Array, default: [] },
    drinkThumb: { type: String, required: [true, "Photo is requiered"] },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false },
);

CocktailSchema.post("save", handleMongooseError);
export const Cocktail = model("cocktail", CocktailSchema);

export const addCocktailSchema = Joi.object({
  drink: Joi.string().required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  glass: Joi.string()
    .valid(...glassList)
    .required(),
  instructions: Joi.string().required(),
  ingredients: Joi.string().required(),
});
