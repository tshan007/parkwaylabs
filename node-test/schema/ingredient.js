// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var IngredientSchema = new Schema({
    username: String,
    ingredients: [{
        refId: String,
        name: String,
        head: Boolean,
        next: String
    }],
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Ingredients = mongoose.model('Ingredient', IngredientSchema);

// make this available to our users in our Node applications
module.exports = Ingredients;

