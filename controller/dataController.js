var cheerio = require('cheerio');
var request = require('request');
var Article = require('../models/Article.js');
var Note = require('../models/Notes.js');



//Created a function to scrape the articles from AppleInsider.com, and after that, render them to the page. 
function scraperFunction(req, res) {
    //created an empty array to store the articles in. 
    var result = [];
    request('http://www.appleinsider.com', function (error, response, html) {
        //This is going to display a modal if there are no new articles to display. 
        if (error) res.send("No new Articles");
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
        // NOTE: Cheerio selectors function similarly to jQuery's selectors, 
        // but be sure to visit the package's npm page to see how it works
        $('div.post').each(function (i, element) {

            //Creating variables for each of the elements that we are wanting to scrape
            var link = $(element).children('h1').children('a').attr('href');
            var title = $(element).children('h1').text();
            var postDescription = $(element).children('div').children(".post-description").text();
            // Creating a variable to keep track of whether the article is a new addition to the database or not. 
            result.push({
                title: title,
                link: link,
                postDescription: postDescription
            });
        });
        // console.log(link);
        // console.log(title);
        // console.log(postDescription);

        // Here, we are comparing the articles that are being looped through to the articles in the database. 
        Article.insertMany(result, function (err, doc) {
            if (err) {
                console.log(err);
                res.json("No new Articles");
            } else {
                //If what is being returned is not equal to an array, then it is not a new article. 
                // console.log(doc);
                res.json(doc);
            }
            //If it is a new article, we are saving it to the database using a function that is being declared below. 
        }); //End of insertMany
    });//End of request
}//End of scraper scraperFunction

//Here we are displaying any articles that have a saved value of false to the index.handlebars page. 
function displayUnsavedArticles(req, res) {
    Article.find({ saved: false }, function (err, doc) {
        if (err) throw err;
        // console.log(doc);
        res.render('index', { article: doc });
    });
}

//Here, we are creating a function that saves an article. This only takes in the scraped article, and then uses the save method to save it to the DB. 
function saveArticle(scrapedArticle) {
    var newArticle = new Article(scrapedArticle);

    newArticle.save(function (err, doc) {
        if (err) throw err;
        return doc;
    });
};

//Exporting all my functions for cross file use. 
module.exports = {
    scraperFunction: scraperFunction,
    displayUnsavedArticles: displayUnsavedArticles,
    saveArticle: saveArticle
}



