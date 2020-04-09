const express = require('express');
const router = express.Router();

// @action          POST
// desc             register a Recipe
// access           private/though accessible without auth at the moment
router.post('/', (req, res) => {
    
})

router.get('/', (req, res) => res.send('recipes route'));

module.exports = router;