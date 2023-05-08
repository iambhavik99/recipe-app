const router = require('express').Router();

const recipe = require('../controllers/recipe.controller');
const auth = require('../middleware/auth.middleware');


router
    .get('/', recipe.getRecipes)
    .get('/:id', recipe.getRecipesById)
    .post('/', auth, recipe.addRecipe)
    .put('/:id', auth, recipe.updateRecipe)
    .get('/reactions/:id', recipe.addReactions)
    .delete('/:id', auth, recipe.deleteRecipe);


module.exports = router;