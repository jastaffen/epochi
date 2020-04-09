const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


const Ingredient = require('../../models/Ingredient');
const Recipe = require('../../models/Recipe');
const Chef = require('../../models/Chef');


const fetchByGroupingAndModel = require('../../methods/fetchByGroupingAndModel');

// @action          POST
// desc             register an ingredient
// access           private/though accessible without auth at the moment
router.post('/', [
    check('name', 'Enter a valid name').not().isEmpty(),
    check('season', 'Season is required').not().isEmpty(),
    check('image', 'Image is Required').not().isEmpty(),
    check('type', 'Type is Required').not().isEmpty()
], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, season, type, image, recipes } = req.body;

        try {
            // make sure chef does not already exit
            let ingredient = await Ingredient.findOne({ name });

            if (ingredient) {
                return res.status(400).send({ errors: [{ msg: 'An Ingredient By that name already exists' }]});
            }

            ingredient = new Ingredient({
                name,
                season,
                type,
                image, 
                recipes
            });

            await ingredient.save();

            res.json(ingredient);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
});

// @action          GET
// desc             GET ALL INGREDIENTS BY MONTH
// access           public
router.get('/:month', async (req,res) => {
    try {
        let ingredients = await Ingredient.find({ season: req.params.month });

        res.json(ingredients);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
// @action          GET
// desc             GET ALL INGREDIENT
// access           public
router.get('/', async (req,res) => {
    try {
        let ingredients = await Ingredient.find();

        res.json(ingredients);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
// @action          GET
// desc             GET ALL INGREDIENT
// access           public
router.get('/ingredient/:ingredient_id', async (req,res) => {    
    try {
        let ingredient = await Ingredient.findById(req.params.ingredient_id);

        if (!ingredient) return res.status(400).json({msg: 'Ingredient Not Found'});

        res.json(ingredient);

    } catch (err) {
        console.error(err.message);
        if (!ingredient) return res.status(400).json({msg: 'Ingredient Not Found'});
        res.status(500).send('Server Error')
    }
});

// @action          GET
// desc             GET AN INGREDIENT'S CHEFS
// access           public
router.get('/chefs/:ingredient_id', async (req,res) => {    
    try {
        let ingredient = await Ingredient.findById(req.params.ingredient_id);

        if (!ingredient) return res.status(400).json({msg: 'Ingredient Not Found'});

        const array = await fetchByGroupingAndModel(ingredient.chefs, Chef);
        const chefs = await Promise.all(array);

        res.json(chefs);

    } catch (err) {
        console.error(err.message);
        if (!ingredient) return res.status(400).json({msg: 'Ingredient Not Found'});
        res.status(500).send('Server Error')
    }
});

// @action          GET
// desc             GET AN INGREDIENT'S RECIPES
// access           public
router.get('/recipes/:ingredient_id', async (req,res) => {    
    try {
        let ingredient = await Ingredient.findById(req.params.ingredient_id);

        if (!ingredient) return res.status(400).json({msg: 'Ingredient Not Found'});
        const selectors = "title image published chef video"
        const array = await fetchByGroupingAndModel(ingredient.recipes, Recipe, selectors);
        const recipes = await Promise.all(array);

        res.json(recipes);

    } catch (err) {
        console.error(err.message);
        if (!ingredient) return res.status(400).json({msg: 'Ingredient Not Found'});
        res.status(500).send('Server Error')
    }
});

module.exports = router;