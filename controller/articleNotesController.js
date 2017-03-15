var Article = require('../models/Article.js');
var Note = require('../models/Article.js');


function findNotes(req, res) {

    console.log(req.params.id);


    Article.find({ _id: req.params.id }, function (err, doc) {
        if (err) throw err;

        console.log(doc[0].notes);
        Note.find({ _id: { $in: doc[0].notes } }, function (err, doc) {
            console.log(doc);
            res.send(doc);
        })
    });
}

module.exports = {
    findNotes: findNotes
}