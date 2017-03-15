var Article = require('../models/Article.js');
var Note = require('../models/Notes.js');

function deleteArticle(req, res) {


    console.log(req.body.id);

    Article.remove({ _id: req.body.id }, function (err, doc) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        else {
            console.log(doc);
        }
    });

}
module.exports = {
    deleteArticle: deleteArticle
}