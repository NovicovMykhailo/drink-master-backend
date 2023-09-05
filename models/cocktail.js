import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongoosError.js";
import { categoryList } from "../contentValues/calegories.js";
import { glassList } from "../contentValues/glasses.js";
import { IngredientSchema } from "./Ingredient.js";

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
    ingredients: [IngredientSchema],
    favs: { type: Array, default: [] },
    drinkThumb: { type: String, required: [true, "Photo is requiered"] },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false },
);

CocktailSchema.post("save", handleMongooseError);
export const Cocktail = model("cocktail", CocktailSchema);

export const addCocktailSchema = Joi.object({
  drink: Joi.string().required().messages({
    "any.required": "The drink field is required.",
  }),
  category: Joi.string().valid(...categoryList).required().messages({
      "any.required": "The category field is required.",
  }),
  glass: Joi.string().valid(...glassList).required().messages({
      "any.required": "The glass field is required.",
  }),
  instructions: Joi.string().required().messages({
    "any.required": "The instructions field is required.",
  }),
  drinkThumb: Joi.string().messages({
    "any.required": "The recipeImg field must be a file and cann not be empty.",
  }),
  ingredients: Joi.array().items(
	Joi.object({
    _id: Joi.string().required().messages({
      "any.required": "The measure _id is required.",
      }),
	  title: Joi.string().required().messages({
		"any.required": "The title field is required.",
	  }),
	  measure: Joi.string().required().messages({
		"any.required": "The measure field is required.",
	  }),
	  ingredientThumb: Joi.string().required().messages({
		"any.required": "The ingredientThumb field is required.",
	  }),
	  "thumb-medium": Joi.string().required().messages({
		"any.required": "The thumb-medium field is required.",
	  }),
	  "thumb-small": Joi.string().required().messages({
		"any.required": "The thumb-small field is required.",
	  }),
	}),
  )
  .required().messages({
	"array.base": "The ingredients must be an array.",
  }),
  drinkAlternate: Joi.string(),
  tags: Joi.string(),
  video: Joi.string(),
  IBA: Joi.string(),
  alcoholic: Joi.string(),
  instructionsES: Joi.string(),
  instructionsDE: Joi.string(),
  instructionsFR: Joi.string(),
  instructionsIT: Joi.string(),
  instructionsRU: Joi.string(),
  instructionsPL: Joi.string(),
  instructionsUK: Joi.string(),
});
