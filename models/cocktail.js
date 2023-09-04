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
		drinkAlternate: { type: String, default: null },
		tags: { type: String, default: null },
		video: { type: String, default: null },
		IBA: { type: String, default: null },
		alcoholic: { type: String, default: "Alcoholic" },
		category: {
			type: String,
			enum: categoryList,
			required: [true, "Set Category"],
		},
		glass: {
			type: String,
			enum: glassList,
			required: [true, "Set Glass Type"],
		},
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
	{ versionKey: false }
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
