import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongoosError.js";

export const IngredientSchema = new Schema({
  _id:{ type: String, required: true },
  title: { type: String, required: [true, "Set ingredient title"] },
  measure: { type: String, required: [true, "Set mesure"] },
  ingredientThumb: { type: String, required: true },
  "thumb-medium": { type: String, required: true },
  "thumb-small": { type: String, required: true },
  },
  { versionKey: false },
);

IngredientSchema.post("save", handleMongooseError);
export const Ingredient = model("ingredient", IngredientSchema);


