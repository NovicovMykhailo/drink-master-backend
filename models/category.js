import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongoosError.js";

const CategorySchema = new Schema(
  { name: String, },
  { versionKey: false },
);

CategorySchema.post("save", handleMongooseError);
export const Category = model("category", CategorySchema);
