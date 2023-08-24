import express from "express";
import ctrl from "../../controllers/cocktails.js";
import isValidId from "../../middleware/isValidId.js";
import authenticate from "../../middleware/authenticate.js";
// import validateBody from "../../middleware/validateBody.js";
// import { addSchema } from "../../models/cocktail.js";

const router = express.Router();

// //GET -  cocktails
router.get("/cocktails", authenticate, ctrl.getAllCocktails);

// //GET - cocktail by id
router.get("/cocktails/:cocktailId", authenticate, isValidId, ctrl.getCocktailById);

// //GET - categories
router.get("/categories", authenticate, ctrl.getCategories);

// //GET - ingredients
router.get("/ingredients", authenticate, ctrl.getIngredients);

// //GET - top-categories
router.get("/ingredients", authenticate, ctrl.getIngredients);

// // //POST - add
// router.post("/", authenticate, validateBody(addSchema), ctrl.addCocktail);

// // //DELETE -  by id
// router.delete("/:cocktailId", authenticate, isValidId, ctrl.deletecocktail);

export default router;
