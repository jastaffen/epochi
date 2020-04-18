const express = require('express');
const router = express.Router();
const decode = require('../../secrets/auth');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { username, pw } = req.body;
    const password = await decode(pw);
    if (username === config.get('userLogin.username')) {
        if (password == config.get('userLogin.password')) {
            const payload = {
                username,
                password
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ isAuthenticated: true, token });
                }
            )
            
        } else {
            res.json({ msg: 'Invalid password or username' })
        }
    } else {
        res.json({ msg: 'Invalid password or username' });
    }
    
});

module.exports = router;

