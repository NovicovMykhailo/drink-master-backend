import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongoosError.js";

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegExp,
    },
    name: {
      type: String,
      required: true,
    },
    avatarURL: { type: String, required: true },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

// export const subscriptionSchema = Joi.object({
//   subscription: Joi.string().valid(...subscriptionList),
// });
