import { Ingredient } from "../models/Ingredient.js";
import { HttpError } from "../helpers/HttpError.js";

const validateIngredient = async (req, res, next) => {
  const ingredientsArray = req.body.ingredients;
  await Promise.all(
    ingredientsArray.map(async item => {
      const { title, ingredientThumb, "thumb-medium": thumbMd, "thumb-small": thumbS } = item;
      const validMeasures = item.hasOwnProperty("measure");
      const validTitle = Boolean(await Ingredient.exists({ title }));
      const validPhoto = Boolean(await Ingredient.exists({ ingredientThumb }));
      const validPhotoM = Boolean(await Ingredient.exists({ "thumb-medium": thumbMd }));
      const validPhotoS = Boolean(await Ingredient.exists({ "thumb-small": thumbS }));
      if (!validTitle) {
        next(HttpError(400, `${item.title} is not valid title`));
      }
      if (!validPhoto) {
        next(HttpError(400, `${item.title} is not valid ingredientThumb`));
      }
      if (!validPhotoM) {
        next(HttpError(400, `${item.title} is not valid "thumb-medium"`));
      }
      if (!validPhotoS) {
        next(HttpError(400, `${item.title} is not valid thumb-small`));
      }
      if (!validMeasures) {
        next(HttpError(400, `Missing measurement in ${item.title}, resipe`));
      }
    }),
  );
  next();
};

export default validateIngredient;
