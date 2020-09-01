const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exerciesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true , useCreateIndex: true});


//@connect to mongo using this
mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//@the below code wasn't needed so commented it, only connect to the DB once and use that instance throughout application

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully!');
// })

/* @ use body parser before adding routes, so the body parses JSON first then connects the routes to 
the application */

//using body parser for not letting the body empty tried without it aswell it doesnt work
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/exercises', exerciesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on the port:' ${port}`);

});