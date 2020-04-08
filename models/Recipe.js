const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    ingredients: [{
        name: {
            type: String,
             
            unit: String,
            description: String
        },
        measurement: {
            type: Number,
        },
        unit: {
            type: String
        },
        additionalInfo: {
            type: String
        }
    }],
    ingredient: {
        type: Schema.Types.ObjectId,
        required: true
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'chef'
    }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);