const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/ingredients')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

const Ingredient = require('../../models/Ingredient');
const Recipe = require('../../models/Recipe');
const Chef = require('../../models/Chef');


const fetchByGroupingAndModel = require('../../methods/fetchByGroupingAndModel');

// @action          POST
// desc             register an ingredient
// access           private/though accessible without auth at the moment
router.post('/', upload.single('image'), [
    check('name', 'Enter a valid name').not().isEmpty(),
    check('season', 'Season is required').not().isEmpty(),
    check('type', 'Type is Required').not().isEmpty()
], 
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, season, type } = req.body;
        const image = req.file.path;

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
                image
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
        let ingredients = await Ingredient.find({ season: req.params.month } );

        // sort ingredients alphabetically
        ingredients = ingredients
            .sort((ing1, ing2) => 
            ing1.name.localeCompare(ing2.name));

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
// desc             GET INGREDIENT BY ID
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
        const selectors = "title image published chef video";
        const array = await fetchByGroupingAndModel(ingredient.recipes, Recipe, selectors);
        const recipes = await Promise.all(array);

        res.json(recipes);

    } catch (err) {
        console.error(err.message);
        if (!ingredient) return res.status(400).json({msg: 'Ingredient Not Found'});
        res.status(500).send('Server Error')
    }
});

// @action          PATCH
// desc             UPDATE AN INGREDIENT    
// access           public
router.patch('/edit-ingredient/:ingredient_id', upload.single('image'), async (req, res) => {
    const { name, type, season } = req.body;
    let image;
    if (req.file) {
        image = req.file.path;
    }

    let seasonArr = season.split(',')

    let ingredientFields = {};
    if (name) ingredientFields.name = name;
    if (type) ingredientFields.type = type;
    if (season) ingredientFields.season = seasonArr;
    if (image) ingredientFields.image = image;

    try {
        let ingredientForUpdate = await Ingredient.findById(req.params.ingredient_id);
        if (!ingredientForUpdate) {
            return res.status(400).json({ msg: 'Chef Not Found' });
        }

        ingredient = await Ingredient.findOneAndUpdate(
                    { _id: req.params.ingredient_id }, 
                    { $set: ingredientFields }, 
                    { new: true }
                ).catch(err => res.status(400).json({ msg: err }));
        return res.json(ingredient);

    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Ingredient Not Found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;