import express from "express";
import ctrl from "../../controllers/cocktails.js";
import isValidId from "../../middleware/isValidId.js";
import authenticate from "../../middleware/authenticate.js";
// import validateBody from "../../middleware/validateBody.js";
// import { addSchema } from "../../models/cocktail.js";

const router = express.Router();

// //GET -  cocktails
router.get("/recipes", authenticate, ctrl.getAllCocktails);



// //GET - categories
router.get("/recipes/category-list", authenticate, ctrl.getCategories);

// //GET - ingredients  
router.get("/ingredients/list", authenticate, ctrl.getIngredients);

// //GET - glasses
router.get("/glasses", authenticate, ctrl.getGlasses);

// //GET - top-categories
router.get("/recipes/main-page", authenticate, ctrl.getTopCocktails);

// //GET - cocktail by id

router.get("/recipes/:cocktailId", authenticate, isValidId, ctrl.getCocktailById);

// // //POST - add
// router.post("/", authenticate, validateBody(addSchema), ctrl.addCocktail);

// // //DELETE -  by id
// router.delete("/:cocktailId", authenticate, isValidId, ctrl.deletecocktail);

export default router;
