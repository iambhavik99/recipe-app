const recipes = require('./recipe.router');

const entry = (app) => {
    app.use('/api/recipe/', recipes);
}

module.exports = entry;