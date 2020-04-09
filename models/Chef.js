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
});

ChefSchema.virtual('fullName').get(function () {
    return this.name.first + ' ' + this.name.last;
  });

module.exports = Chef = mongoose.model('chef', ChefSchema);

