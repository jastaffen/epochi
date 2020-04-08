const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();
app.get('/', (req, res) => res.send('API Running'));

app.use(express.json({ extended: false }));

// Route definitions
app.use('/api/chefs', require('./routes/api/chefs'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/ingredients', require('./routes/api/ingredients'));

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

