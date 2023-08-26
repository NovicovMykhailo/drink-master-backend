import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/HttpError.js";

export default function isValidId(req, res, next) {
  const id = req.params.cocktailId;
  console.log(id)

  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not a valid`));
  }
  next();
}


export function isValidCocktailId(req, res, next) {
  const id = req.body.cocktailId;
  if(!id){
    next(HttpError(400, `id must be set in cocktailId value`));
  }

  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not a valid`));
  }
  next();
}
