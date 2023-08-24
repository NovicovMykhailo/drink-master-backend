import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/nandleMongoosError.js";

const GlassSchema = new Schema(
  { name: String,},
  { versionKey: false },
);

GlassSchema.post("save", handleMongooseError);
export const Glass = model("glass", GlassSchema);
