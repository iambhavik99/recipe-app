const router = require('express').Router();

const recipe = require('../controllers/recipe.controller');


router
    .get('/', recipe.getRecipes)
    .get('/:id', recipe.getRecipesById)
    .post('/', recipe.addRecipe);


module.exports = router;