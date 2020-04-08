const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChefSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    recipes: [{
        recipe: {
            type: Schema.Types.ObjectId,
            ref: 'recipe'
        }
    }]
})

module.exports = Chef = mongoose.model('chef', ChefSchema);

