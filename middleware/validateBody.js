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
          throw HttpError(400, `'drink': cocktail title is required`);
        case '\"instructions\" is not allowed to be empty':
          throw HttpError(
            400,
            `instructions should provide a recipe preparation instruction  is required `,
          );
        case  "\"category\" must be one of [Ordinary Drink, Cocktail, Snake, Other/Unknow, Cocoa, Shot, Coffee/Tea, Homemade Liqueur, Punch / Party Drink, Beer, Soft Drink]":
          throw HttpError(
            400,
            `category must be one of [${categoryList}]`,
          );
        case "\"glass\" must be one of [Highball glass, Cocktail glass, Old-fashioned, Whiskey Glass, Collins glass, Pousse cafe glass, Champagne flute, Whiskey sour glass, Cordial glass, Brandy snifter, White wine glass]":
          throw HttpError(
            400,
            `glass must be one of [${glassList}]`,
          );
        case "\"ingredients\" is required":
          throw HttpError(400, `ingredients must be array of objects {title: one of [${ingredients}] ; 3 photoUrl ;  measures } fields in JSON.String`);
          case "\"recipeImg\" is not allowed":
            throw HttpError(400, 'recipeImg must be a file and can not be empty')
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

