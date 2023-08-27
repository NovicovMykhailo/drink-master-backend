import { HttpError } from "../helpers/HttpError.js";


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
        case '"category" must be one of [Ordinary Drink, Cocktail, Snake, Other/Unknow, Cocoa, Shot, Coffee/Tea, Homemade Liqueur, Punch / Party Drink, Beer, Soft Drink]':
          throw HttpError(
            400,
            "! 'category' must be one of [Ordinary Drink, Cocktail, Snake, Other/Unknow, Cocoa, Shot, Coffee/Tea, Homemade Liqueur, Punch / Party Drink, Beer, Soft Drink]",
          );
        case '"glass" must be one of [Highball glass, Cocktail glass, Old-fashioned, Whiskey Glass, Collins glass, Pousse cafe glass, Champagne flute, Whiskey sour glass, Cordial glass, Brandy snifter, White wine glass]':
          throw HttpError(
            400,
            "! 'glass' must be one of [Highball glass, Cocktail glass, Old-fashioned, Whiskey Glass, Collins glass, Pousse cafe glass, Champagne flute, Whiskey sour glass, Cordial glass, Brandy snifter, White wine glass]",
          );
        case '"ingredients" is not allowed to be empty':
          throw HttpError(400, `! ingredients must be array of objects {title: one of [${arr}] ; 3 photoUrl ;  measures } fields in JSON.String`);
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


const arr = ["Bitters", 
"Apple brandy", 
"Orange bitters", 
"Espresso", 
"Angelica root", 
"Everclear", 
"Cognac", 
"Yoghurt", 
"Lemon", 
"Whiskey", 
"Apple cider", 
"Peach nectar", 
"Chocolate syrup", 
"Mango", 
"Grapes", 
"Chocolate", 
"Peach Vodka", 
"Absolut Citron", 
"Ale", 
"Cider", 
"Peppermint schnapps", 
"Strawberry schnapps", 
"Dry Vermouth", 
"Light rum", 
"Lemon vodka", 
"Coffee liqueur", 
"Milk", 
"Berries", 
"Heavy cream", 
"Irish cream", 
"7-Up", 
"Dubonnet Rouge", 
"Dark rum", 
"Sweet Vermouth", 
"Bourbon", 
"Tequila", 
"Kahlua", 
"demerara Sugar", 
"Creme de Cassis", 
"Amaretto", 
"Coffee brandy", 
"Red wine", 
"Sloe gin", 
"Sugar syrup", 
"Spiced rum", 
"Sprite", 
"Irish whiskey", 
"Lemon juice", 
"Ginger", 
"Egg", 
"Firewater", 
"Lager", 
"Southern Comfort", 
"Triple sec", 
"Tomato juice", 
"Cocoa powder", 
"Galliano", 
"Cranberries", 
"Midori melon liqueur", 
"Sambuca", 
"Gin", 
"Apricot brandy", 
"Champagne", 
"Grenadine", 
"Apple juice", 
"Cantaloupe", 
"Ouzo", 
"Lemonade", 
"Chocolate liqueur", 
"Lime juice", 
"Cherry brandy", 
"Grapefruit juice", 
"Johnnie Walker", 
"Brandy", 
"Vodka", 
"Añejo rum", 
"Watermelon", 
"Ricard", 
"Cranberry juice", 
"Pisco", 
"Applejack", 
"Scotch", 
"Creme de Cacao", 
"Strawberries", 
"Lime", 
"Sugar", 
"Blackberry brandy", 
"Blended whiskey", 
"Sherry", 
"Pineapple juice", 
"Kiwi", 
"Water", 
"Egg yolk", 
"Grape juice", 
"Tea", 
"Carbonated water", 
"Port", 
"Rum", 
"Coffee", 
"Orange"]
