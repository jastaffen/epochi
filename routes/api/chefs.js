const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/chefs')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const Chef = require('../../models/Chef');
const Ingredient = require('../../models/Ingredient');
const Recipe = require('../../models/Recipe');

const fetchByGroupingAndModel = require('../../methods/fetchByGroupingAndModel');

// @action          POST
// desc             register a chef
// access           private/though accessible without auth at the moment
router.post('/', upload.single('avatar'), [
    check('name', 'Name is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, bio } = req.body;
        const avatar = req.file.path;
        
        try {
            // make sure chef does not already exit
            let chef = await Chef.findOne({ name });
            
            if (chef && chef.name.toUpperCase() === name.toUpperCase()) {
                return res.status(400).send({ errors: [{ msg: 'A Chef By that name already exists' }]});
            }
            
            chef = new Chef({
                name,
                bio,
                avatar
            });

            await chef.save();

            res.json(chef);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
})

// @action          GET/INDEX
// desc             Get all chefs
// access           Public
router.get('/', async (req, res) => {

    try {

        let chefs = await Chef.find().select("name avatar");
        res.json(chefs); 

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

// @action         GET
// desc            GET A CHEF'S Ingredients
// access          Public
router.get('/:chef_id/ingredients', async (req, res) => {
    try {

        let chef = await Chef.findById(req.params.chef_id);
        
        if (!chef) return res.status(400).json({msg: 'Chef Not Found'});
        
        let array = await fetchByGroupingAndModel(chef.ingredients, Ingredient);
        let ingredients = await Promise.all(array);
       
        res.json(ingredients);
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Chef Not Found' });
        }
        res.status(500).send('Server Error');
    }
});

// @action         GET
// desc            GET A CHEF'S Recipes
// access          Public
router.get('/:chef_id/recipes', async (req, res) => {
    try {

        let chef = await Chef.findById(req.params.chef_id);
        
        if (!chef) return res.status(400).json({msg: 'Chef Not Found'});
        const selector = "title image published ingredient"
        let array = await fetchByGroupingAndModel(chef.recipes, Recipe, selector);
        let recipes = await Promise.all(array);
       
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Chef Not Found' });
        }
        res.status(500).send('Server Error');
    }
});


// @action         GET/SHOW
// desc            Get a chef by ID
// access          Public
router.get('/:chef_id', async (req, res) => {
    try {
        let chef = await Chef.findById(req.params.chef_id);
        if (!chef) res.status(400).json({msg: 'Chef Not Found'});
        res.json(chef);
    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Chef Not Found' });
        }
        res.status(500).send('Server Error');
    }
});

// @action         PATCH/EDIT
// desc            Edit a Chef
// access          Public
router.patch('/:chef_id', upload.single('avatar'), async (req,res) => {
    const { name, bio } = req.body;
    let avatar;
    if (req.file) {
        avatar = req.file.path;
    }

    let chefFields = {};
    if (name) chefFields.name = name;
    if (bio) chefFields.bio = bio;
    if (avatar) chefFields.avatar = avatar;

    try {
        let chefForUpdate = await Chef.findById(req.params.chef_id);
        if (!chefForUpdate) {
            return res.status(400).json({ msg: 'Chef Not Found' });
        }

        chef = await Chef.findOneAndUpdate(
                    { _id: req.params.chef_id }, 
                    { $set: chefFields }, 
                    { new: true }
                ).catch(err => res.status(400).json({ msg: err }));
        return res.json(chef);

    } catch (err) {
        console.error(err.message);
        if (err.path === '_id') {
            return res.status(400).json({ msg: 'Chef Not Found' });
        }
        res.status(500).send('Server Error');
    }
});

// @action         DELETE
// desc            DELETE a Chef
// access          Public
router.delete('/:chef_id', async (req, res) => {
    try {
        const deletedChef = await Chef.findOneAndRemove({ _id: req.params.chef_id });

        res.json(deletedChef);

    } catch (err) {
        res.status(500).send('Server Error');
    }
});


module.exports = router;