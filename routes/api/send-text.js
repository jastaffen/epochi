const express = require('express');
const router = express.Router();
const config = require('config');
const client = require('twilio')(config.get("accountSid"), config.get("authToken"));

router.get('/', (req, res) => {
    const { textMessage, recipient } = req.query;

    client.messages.create({
        body: textMessage,
        from: config.get("phoneNumber"),
        to: recipient
    }).then(message => res.send(message.sid));
    
});

module.exports = router;