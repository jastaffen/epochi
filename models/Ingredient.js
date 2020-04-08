const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    recipes: [{
        recipe: {
            type: Schema.Types.ObjectId,
            ref: 'recipe'
        } 
    }]
});

module.exports = Ingredient = mongoose.model('ingredient', IngredientSchema)