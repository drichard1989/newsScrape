var Article = require('../models/Article.js');
var Note = require('../models/Notes.js');


function findNotes(req, res) {

    console.log(req.params.id);


    Article.find({ _id: req.params.id }, function (err, doc) {
        if (err) throw err;

        console.log("Note ID " + doc[0].note);
        Note.find({ _id: { $in: doc[0].note } }, function (err, doc) {
            // Doc has no content. 
            console.log("Note Aray: " + doc);
            res.send(doc);  
        })
    });
}

module.exports = {
    findNotes: findNotes
}