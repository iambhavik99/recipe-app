const router = require('express').Router();

const recipe = require('../controllers/recipe.controller');
const auth = require('../middleware/auth.middleware');


router
    .get('/', recipe.getRecipes)
    .get('/:id', recipe.getRecipesById)
    .post('/', auth, recipe.addRecipe)
    .get('/reactions/:id', recipe.addReactions);


module.exports = router;