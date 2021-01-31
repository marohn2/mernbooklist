//Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')

//const MONGODB_URI = 'mongodb+srv://admin-ryan:pass12345@cluster0.99pg4.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_booklog',{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongoose!')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request logger

app.use(morgan('tiny'));
app.use('/api', routes);

//to signal that application is on heroku 
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`server is running at ${PORT}`));