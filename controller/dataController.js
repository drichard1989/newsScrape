var cheerio = require('cheerio');
var request = require('request');
var Article = require('../models/Article.js');


module.exports = {
    // An empty array to save the data that we'll scrape

    scraperFunction: function (req, res) {
        // var articles = [];

        request('http://www.appleinsider.com', function (error, response, html) {
            if (error) throw error;
            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(html);
            // NOTE: Cheerio selectors function similarly to jQuery's selectors, 
            // but be sure to visit the package's npm page to see how it works
            $('div.post').each(function (i, element) {
                // Selecting each instance of the HTML body that you want to scrape

                var link = $(element).children('a').attr('href');
                var title = $(element).children('h1').text();
                var postDescription = $(element).children(".post-description").text();

                var isNewArticle = true;

                Article.find({ title: title }, function (err, doc) {
                    if (err) throw err;

                    if (doc !== []) {
                        isNewArticle = false;
                    }
                });
                if (isNewArticle) {
                    saveArticle({ title: title, link: link, postDescription: postDescription });
                    // result.push({
                    //     title: title,
                    //     link: link,
                    //     postDescription: postDescription
                    // });

                }

            });
            //Sending the data back as a JSON object.
            // res.json(result);

        });
        console.log("route being called");
    }
}

function saveArticle(scrapedArticle) {
    var newArticle = new Article(scrapedArticle);

    newArticle.save(function(err, doc){
        if(err) throw err;
        return doc;
    });
};