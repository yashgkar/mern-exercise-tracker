const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true , useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
})

const exerciesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciesRouter);
app.use('/users', usersRouter);

app.use(bodyParser.urlencoded({ extended: false })) //using body parser for not letting the body empty tried without it aswell it doesnt work
app.use(bodyParser.json())

app.listen(port, ()=> {
    console.log(`Server is running on the port:' ${port}`);

});