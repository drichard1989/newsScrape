// Requires express npm package
var express = require("express");
// Requires the request NPM package, which allows for us to make calls to http addresses
var request = require("request");

//Requires bodyparser npm package, which parses (analyzes) incoming objects. 
var bodyParser = require("body-parser");

//Requires the cheerio scraper npm package
var cheerio = require("cheerio");

//Allows us to query the mongoDB with calls. The bodyParser object exposes various factories to create middlewares. All middlewares will populate the req.body property with the parsed body, or an empty object ({}) if there was no body to parse (or an error was returned).
// var mongojs = require("mongojs");
var mongoose = require("mongoose");

//Allows me to see the database. Need to change this for MongoDb
// var db = require("./models");
//Requires method-override npm package, which lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
var methodOverride = require("method-override");

// Sets variable app to the express method
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Creating static directories
app.use(express.static("public"));
app.use(methodOverride("_method"));

//Requiring Handlebars
var exphbs = require ("express-handlebars");

//Laysout the settings for handlebars implementation
app.engine("handebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Sets up the Express App
app.set('trust proxy', "1");

require("./routes/homeRoute.js")(app);


request('http://www.appleinsider.com', function (error, response, html) {

            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(html);

            // An empty array to save the data that we'll scrape

            // Select each instance of the HTML body that you want to scrape
            // NOTE: Cheerio selectors function similarly to jQuery's selectors, 
            // but be sure to visit the package's npm page to see how it works
            $('div.post').each(function(i, element){

            var link = $(element).find("a").attr("href");
            var title = $(element).find("a").text();

            // Save these results in an object that we'll push into the result array we defined earlier
            
            // db.apples.insert({"title": title, "link": link});
            console.log(title);
            console.log(link);
        });
        
        // console.log(result);
        // db.apples.insert({result});
        });
        

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
