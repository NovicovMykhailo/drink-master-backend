import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/nandleMongoosError.js";

const IngredientSchema = new Schema(
  {
    title: String,
    ingredientThumb: String,
    "thumb-medium" : String,
    "thumb-small": String,
  },
  { versionKey: false },
);

IngredientSchema.post("save", handleMongooseError);
export const Ingredient = model("ingredient", IngredientSchema);


