import express from "express";
import ctrl from "../../controllers/cocktails.js";
import isValidId, { isValidCocktailId } from "../../middleware/isValidId.js";
import authenticate from "../../middleware/authenticate.js";
import upload from "../../middleware/cloudinaryUpload.js";
import validateBody from "../../middleware/validateBody.js";
import { addCocktailSchema } from "../../models/cocktail.js";
import JsnParse from "../../middleware/JsnParse.js";
import validateIngredient from "../../middleware/validateIngredient.js";

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

// //GET - Search by URLsearchParams
router.get("/search", authenticate, ctrl.getCocktailsByQuerry);

// // //GET cocktails searched by favs.length
router.get("/popular-recipes", authenticate, ctrl.getPopularRecipe);

// //GET - cocktail by id
router.get("/recipes/:cocktailId", authenticate, isValidId, ctrl.getCocktailById);

// // //GET - get favorite user cocktails
router.get("/favorite", authenticate, ctrl.getFavsByUser);

// // //POST - add cocktail to favorite
router.post("/favorite", authenticate, isValidCocktailId, ctrl.addToFavs);

// // //DELETE - remove coctail from favorites
router.delete("/favorite", authenticate, isValidCocktailId, ctrl.removeFromFavs); 

// // //GET - all own recipies
router.get("/own", authenticate, ctrl.getOwnRecipes);

// // //POST - add own recipe
router.post( "/own", authenticate, upload.single("recipeImg"), validateBody(addCocktailSchema), JsnParse, validateIngredient,
  ctrl.addOwnRecipe,
);

// // //DELETE -  own recipe
router.delete("/own", authenticate, isValidCocktailId, ctrl.removeOwnRecipe);

export default router;
