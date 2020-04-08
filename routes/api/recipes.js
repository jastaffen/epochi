const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('recipes route'));

module.exports = router;