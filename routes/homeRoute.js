//This is the file for our home page route. In this file, we are setting the route to "/", and anything that we want to fire upon the visit of this page should be called inside of this file. I am trying to get the main handlebars file to load when the user visits this page. 
const cheerio = require('cheerio');
var homeController = require ("../controller/homeController.js");
const request = require('request');

module.exports = function (app){
    //Right now, just to see if my paths were correct, I have created a function called grabALl inside of the controller, and am calling it here, and it will console that graball is Firing. 
    app.get("/", function (req, res){

        res.render("index", {});
    //     var articles = [];
    //     request('http://www.appleinsider.com', function (error, response, html) {

    //         // Load the HTML into cheerio and save it to a variable
    //         // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    //         var $ = cheerio.load(html);
    //         // var articles = [];
    //         // An empty array to save the data that we'll scrape
    //         // var articles = []
    //         // Select each instance of the HTML body that you want to scrape
    //         // NOTE: Cheerio selectors function similarly to jQuery's selectors, 
    //         // but be sure to visit the package's npm page to see how it works
    //         $('div.post').each(function(i, element){
                
    //             var link = $(element).find("a").attr("href");
    //             var title = $(element).find("a").text();

    //             // Save these results in an object that we'll push into the result array we defined earlier
                
    //             // db.apples.insert({"title": title, "link": link});

    //             articles.push({
    //                 title: title,
    //                 link: link
    //             });
                
    //             });
        
    //     res.render("index", {element: articles});
    //     });
    //     console.log("route being called")
    //     //Here I am trying to render the main handlebars file so that I can see my page on the browser. 
        
        
    });

}