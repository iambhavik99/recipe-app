const mongoose = require('mongoose');
const fs = require('fs');

const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    reactions: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});


RecipeSchema.methods.toJSON = function () {
    var recipe = this;
    var recipeObj = recipe.toObject();

    const imageBase64 = fs.readFileSync(recipeObj.image, 'base64').toString();
    const fileExtension = recipeObj.image?.split(".")[1];
    recipeObj.image = `data:image/${fileExtension};base64,${imageBase64}`

    return recipeObj;
}

RecipeSchema.pre('save', async function (next) {

    var recipe = this;

    if (recipe.image?.startsWith("uploads/")) {
        next();
    }
    else {
        const fileExtension = recipe.image.split(";")[0]?.split("/")[1];

        const imageFilePath = `uploads/${recipe.id}.${fileExtension}`

        // strip off the data: url prefix to get just the base64-encoded bytes
        const imageBase64Striped = recipe.image.replace(/^data:image\/\w+;base64,/, "");

        // convert base64 to buffer
        const imageBuffer = new Buffer.from(imageBase64Striped, 'base64')

        // save image
        fs.writeFileSync(imageFilePath, imageBuffer);

        recipe.image = imageFilePath;

        next();
    }

});


RecipeSchema.post('deleteOne', function (next) {
    var recipe = this;

    fs.unlinkSync(`uploads/${recipe._conditions._id}.jpeg`);

    next();

});


const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;