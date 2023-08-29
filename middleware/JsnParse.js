export default function JsnParse(req, res, next) {
  if (req.body.ingredients && typeof req.body.ingredients[0] === "string") {
    const parsedArray = JSON.parse(req.body.ingredients);
    req.body.ingredients = parsedArray;
  }
  next();
}
