require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const mongoDB = `mongodb://localhost:27017/test1`
mongoose.connect(
    mongoDB, 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    });

app.get('/', async(req, res) => {
    res.send('Index');
});

app.listen(3001, ()=>{
    console.log(`Servidor en ejecucion en el puerto 3001`);
});