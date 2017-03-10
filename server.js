// Requires express npm package
const express = require('express');
// Requires the request NPM package, which allows for us to make calls to http addresses
const request = require('request');

//Requires bodyparser npm package, which parses (analyzes) incoming objects. 
const bodyParser = require('body-parser');

//Requires the cheerio scraper npm package
const cheerio = require('cheerio');

//Allows us to query the mongoDB with calls. 
// The bodyParser object exposes various factories to create middlewares. 

// All middlewares will populate the req.body property with the parsed body, 
//or an empty object ({}) if there was no body to parse (or an error was returned).
// var mongojs = require("mongojs");
const mongoose = require('mongoose');

//Requiring Handlebars
const exphbs = require('express-handlebars');

//Allows me to see the database. Need to change this for MongoDb
// var db = require("./models");
//Requires method-override npm package, which lets you use HTTP verbs such as 
//PUT or DELETE in places where the client doesn't support it.
const methodOverride = require('method-override');

// Sets variable app to the express method
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Creating static directories
app.use(express.static('public'));
app.use(methodOverride('method'));



//Laysout the settings for handlebars implementation
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Sets up the Express App
app.set('trust proxy', '1');

require("./routes/homeRoute.js")(app);
        

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
