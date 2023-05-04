const recipes = require("./recipe.router");
const auth = require("./auth.router");

const entry = (app) => {
  app.use("/api/recipe", recipes);
  app.use("/api", auth);
};

module.exports = entry;
