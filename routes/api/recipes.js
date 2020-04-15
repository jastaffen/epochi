const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Recipe = require('../../models/Recipe');
const Chef = require('../../models/Chef');
const Ingredient = require('../../models/Ingredient');

// @action          POST
// desc             register a Recipe
// access           private/though accessible without auth at the moment
router.post('/recipe/:chef_id/:ingredient_id', [
    check('title', 'Title is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
    check('instructions', 'Instructions are required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { chef_id, ingredient_id } = req.params;
    const { title, image, instructions, ingredients, video, description, published } = req.body;

    try {
        // make sure recipe with particular title hasn't already been declared
        let recipe = await Recipe.findOne({ title });
        if (recipe) {
            return res.status(400).send({ errors: [{ msg: 'A Recipe By that name already exists' }]});
        }

        // create recipe instance
        let newRecipe = new Recipe({
            title, image, instructions, ingredients, video, description, published
        });
        // assign chef as recipe author but make sure chef_id exists 
        const chef = await Chef.findById(chef_id);
        if (!chef) res.status(400).json({msg: 'Chef Not Found'});
        newRecipe.chef = chef;
        // assign Ingredient as special ingredient but make sure ingredient_id exits
        const ingredient = await Ingredient.findById(ingredient_id);
        if (!ingredient) res.status(400).json({msg: 'Ingredient Not Found'});
        newRecipe.ingredient = ingredient;
        newRecipe.month = ingredient.season[0];
        // persist to database
        await newRecipe.save();

        // push recipe into ingredient and chef
        chef.recipes.push(newRecipe);
        if (!chef.ingredients.ingredient) {
            chef.ingredients.push(ingredient);
        }
    
        ingredient.recipes.push(newRecipe);
        if (!ingredient.chefs.includes(chef)) ingredient.chefs.push(chef);
        
        // save chef and ingredient
        chef.save();
        ingredient.save();

        res.status(201).json(newRecipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')  
    }   
});


// @action          GET
// desc             GET ALL RECIPES
// access           Public
router.get('/', async (req, res) => {
    try {
        let recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @action          GET
// desc             GET RECIPE BY ID
// access           Public
router.get('/:recipe_id', async (req, res) => {
    try {   
        let recipe = await Recipe.findById(req.params.recipe_id);
        if (!recipe) res.status(400).json({msg: 'Recipe Not Found'});
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/recipes-by-month/:month', async (req, res) => {
    try {
        let recipes = await Recipe.find({ month: req.params.month })
            .populate('chef', ['name', 'avatar'])
                .select("title image published ingredient");
        
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
    
})

module.exports = router;