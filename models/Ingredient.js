const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    season: {
        type: []
    },
    mostActive: {
        type: String
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
    }],
    chefs: [{
        chef: {
            type: Schema.Types.ObjectId,
            ref: 'chef'
        }
    }]
});

module.exports = Ingredient = mongoose.model('ingredient', IngredientSchema)