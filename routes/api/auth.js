const express = require('express');
const router = express.Router();
const decode = require('../../secrets/auth');
const config = require('config')

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const pw = await decode(password);
    if (username === config.get('userLogin.username')) {
        if (pw == parseInt(config.get('userLogin.password'))) {
            return res.json({isAuthenticated: true})
        } else {
            res.send('Invalid password or username')
        }
    } else {
        res.send('Invalid password or username');
    }
    
});

module.exports = router;

