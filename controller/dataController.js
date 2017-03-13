var cheerio = require('cheerio');
var request = require('request');
var Article = require('../models/Article.js');
var Note = require('../models/Article.js');



// An empty array to save the data that we'll scrape



function scraperFunction(req, res) {
    var result = [];
    request('http://www.appleinsider.com', function (error, response, html) {
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
            if (err) res.json("No new Articles");
            //If what is being returned is not equal to an array, then it is not a new article. 
            console.log(doc);
            res.json(doc);
            //If it is a new article, we are saving it to the database using a function that is being declared below. 
        }); //End of insertMany
    });//End of request
}//End of scraper scraperFunction

function displayUnsavedArticles(req, res) {
    Article.find({ saved: false }, function (err, doc) {
        if (err) throw err;
        console.log(doc);
        res.render('index', { article: doc });
    });
}

function saveArticle(scrapedArticle) {
    var newArticle = new Article(scrapedArticle);

    newArticle.save(function (err, doc) {
        if (err) throw err;
        return doc;
    });
};

module.exports = {
    scraperFunction: scraperFunction,
    displayUnsavedArticles: displayUnsavedArticles,
    saveArticle: saveArticle
}



