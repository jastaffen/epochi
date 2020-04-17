const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();
app.get('/', (req, res) => res.send('API Running'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use(express.json({ extended: false }));

// Route definitions
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/chefs', require('./routes/api/chefs'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/ingredients', require('./routes/api/ingredients'));
app.use('/api/send-text', require('./routes/api/send-text'));


const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

