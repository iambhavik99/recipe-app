const Recipe = require("../models/recipe.model");

// get list of all recipes
const getRecipes = async (req, res, next) => {
    try {
        const response = await Recipe
            .find({})
            .select({ "_id": 1, "name": 1, "image": 1 })

        res.status(200)
            .send({ items: response });

    }
    catch (ex) {
        res.status(400)
            .send({
                err: ex.message,
                code: ex.code
            });
    }
}

// get recipe by id
const getRecipesById = async (req, res) => {
    try {
        const response = await Recipe.findOne({ _id: req.params.id });

        res.status(200)
            .send(response);
    }
    catch (ex) {
        res.status(400)
            .send({
                err: ex.message,
                code: ex.code
            });
    }
}

// add new recipe
const addRecipe = async (req, res) => {
    try {

        const payload = req.body;

        let recipe = new Recipe();
        recipe.name = payload.name;
        recipe.ingredients = payload.ingredients;
        recipe.steps = payload.steps;
        recipe.image = payload.image;

        const response = await recipe.save();

        res.status(200)
            .send(response);
    }
    catch (ex) {
        res.status(400)
            .send({
                err: ex.message,
                code: ex.code
            });
    }
}

const updateRecipe = async (req, res) => {
    try {

        const payload = req.body;

        const recipe = await Recipe.findOne({ _id: req.params.id });

        recipe.name = payload.name;
        recipe.ingredients = payload.ingredients;
        recipe.steps = payload.steps;
        recipe.image = payload.image;

        const response = await recipe.save();

        res.status(200)
            .send(response);
    }
    catch (ex) {
        res.status(400)
            .send({
                err: ex.message,
                code: ex.code
            });
    }
}


const addReactions = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id });
        recipe.reactions = recipe.reactions + 1;

        const response = await recipe.save();

        res.status(200)
            .send(response);
    }
    catch (ex) {
        res.status(400)
            .send({
                err: ex.message,
                code: ex.code
            });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.id });
        res.status(200);
    }
    catch (ex) {
        res.status(400)
            .send({
                err: ex.message,
                code: ex.code
            });
    }
}


module.exports = {
    getRecipes,
    getRecipesById,
    addRecipe,
    addReactions,
    updateRecipe,
    deleteRecipe
}