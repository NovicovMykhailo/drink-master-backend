import { Schema, model } from "mongoose";
import { emailRegExp } from "../contentValues/regexps.js";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongoosError.js";


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
  name: Joi.string().required().messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The name field is required.',
    'string.empty': 'The name must not be empty.',
  }),
  email: Joi.string().pattern(emailRegExp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The name must not be empty.',
  }),
});

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The name field is required.',
    'string.empty': 'The name must not be empty.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The password must not be empty.',
  }),
});


