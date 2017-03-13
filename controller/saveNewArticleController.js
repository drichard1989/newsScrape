var Article = require('../models/Article.js');

function saveNewArticle(req, res){
    console.log("req,body.id in saveNewArticleController.js: " + req.body._id);
    //Here, we are finding the item in the db with the same id as the id of the element that we are passing in, and saving that document's value as true in the db.
    Article.findOneAndUpdate({ _id: req.body._id}, {"saved": true})
    //Executing the above query.
    .exec(function(err, doc) {
        //Logging any errors
        if (err) {
            console.log(err);
        }
        
    })
}

//Exporting the function above to be available in the saveNewArticleRoute file.
module.exports = {
    saveNewArticle: saveNewArticle
}