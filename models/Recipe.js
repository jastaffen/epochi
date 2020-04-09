const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String
    },
    description: {
        type: String
    },
    instructions: {
        type: [String],
        required: true
    },
    ingredients: [{
        name: {
            type: String,
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
    published: {
        type: String,
        default: Date.now,
        required: true
    },
    ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'chef'
    }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);