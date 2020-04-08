const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('chefs route'));

module.exports = router;