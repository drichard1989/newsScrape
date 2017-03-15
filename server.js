// Requires express npm package
var express = require('express');
// Requires the request NPM package, which allows for us to make calls to http addresses
var request = require('request');

//Requires bodyparser npm package, which parses (analyzes) incoming objects. 
var bodyParser = require('body-parser');

//Requires the cheerio scraper npm package
var cheerio = require('cheerio');

//Allows us to query the mongoDB with calls. 
// The bodyParser object exposes various factories to create middlewares. 

// All middlewares will populate the req.body property with the parsed body, 
//or an empty object ({}) if there was no body to parse (or an error was returned).
// var mongojs = require("mongojs");
var mongoose = require('mongoose');

var Note = require("./models/Notes.js");
var Article = require("./models/Article.js")

//Requiring Handlebars
var exphbs = require('express-handlebars');


//Allows me to see the database. Need to change this for MongoDb
// var db = require("./models");
//Requires method-override npm package, which lets you use HTTP verbs such as 
//PUT or DELETE in places where the client doesn't support it.
var methodOverride = require('method-override');

mongoose.Promise = Promise;

// Sets variable app to the express method
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Creating static directories
app.use(express.static('public'));
app.use(methodOverride('method'));

mongoose.connect("mongodb://heroku_w6tfjjxj:ap2mtlhaq025poe74ta191l5i3@ds127300.mlab.com:27300/heroku_w6tfjjxj");
var db = mongoose.connection;
// Show any mongoose errors

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});




//Laysout the settings for handlebars implementation
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Sets up the Express App
app.set('trust proxy', '1');

require("./routes/homeRoute.js")(app);
require("./routes/dataRoute.js")(app);
require("./routes/savedArticlesRoute.js")(app);
require("./routes/saveNewArticleRoute.js")(app);
require("./routes/articleNotesRoute.js")(app);
require("./routes/deleteArticleRoute.js")(app);
require("./routes/saveNoteRoute.js")(app);
require("./routes/deleteNoteRoute.js")(app);


        

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
