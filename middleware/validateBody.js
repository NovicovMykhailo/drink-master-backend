import { HttpError } from "../helpers/HttpError.js";
import { ingredients } from "../contentValues/ingrediants.js";
import { glassList } from "../contentValues/glasses.js";
import { categoryList } from "../contentValues/calegories.js";


const validateBody = schema => {
  const func = (req, res, next) => {
    const isBodyEmpty = Object.keys(req.body).length === 0 ? true : false;

    const { error } = schema.validate(req.body);
    if (isBodyEmpty) {
      throw HttpError(400, "missing fields");
    }

    if (error) {
      switch (error.message) {
        case '"drink" is not allowed to be empty':
          throw HttpError(400, `! 'drink' {cocktail title} is required (String)`);
        case '"instructions" is not allowed to be empty':
          throw HttpError(
            400,
            `! 'instructions' is required {should provide a recipe preparation instruction} must be String`,
          );
        case `"category" must be one of [${categoryList}]`:
          throw HttpError(
            400,
            `! 'category' must be one of [${categoryList}]`,
          );
        case `"glass" must be one of [${glassList}]`:
          throw HttpError(
            400,
            `! 'glass' must be one of [${glassList}]`,
          );
        case '"ingredients" is not allowed to be empty':
          throw HttpError(400, `! ingredients must be array of objects {title: one of [${ingredients}] ; 3 photoUrl ;  measures } fields in JSON.String`);
        default:
          next(HttpError(400, error.message));
          break;
      }
    }
    next();
  };
  return func;
};

export default validateBody;

