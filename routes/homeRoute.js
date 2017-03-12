//This is the file for our home page route. In this file, we are setting the route to "/", and anything that we want to fire upon the visit of this page should be called inside of this file. I am trying to get the main handlebars file to load when the user visits this page. 
const cheerio = require('cheerio');
var homeController = require ("../controller/homeController.js");
const request = require('request');

module.exports = function (app){
    //Right now, just to see if my paths were correct, I have created a function called grabALl inside of the controller, and am calling it here, and it will console that graball is Firing. 
    app.get("/", function (req, res){

        res.render("index", {});
  
    });

}