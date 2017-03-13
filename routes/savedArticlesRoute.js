var savedArticlesController = require("../controller/savedArticlesController.js");

module.exports = function(app){
    app.get("/savedarticles", savedArticlesController.grabSavedArticles)
};