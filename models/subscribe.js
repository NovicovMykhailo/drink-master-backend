import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/nandleMongoosError.js";

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const emailSubscribeSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			match: emailRegExp,
		},
		subscribe: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false }
);

emailSubscribeSchema.post("save", handleMongooseError);

export const Subscribe = model("subscribe", emailSubscribeSchema);

export const subscribeSchema = Joi.object({
	email: Joi.string().email().required(),
});
