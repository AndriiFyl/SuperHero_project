const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const heroRoutes = require('./src/routes/heroRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

app.use('/api/superheroes', heroRoutes);

app.use((req, res) => {
    res.status(404).send({message: req.originalUrl + ' not found'})
})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log("Error MONGODB connection: ", err));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

module.exports = app;