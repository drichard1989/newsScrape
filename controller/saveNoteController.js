var Article = require('../models/Article.js');
var Note = require('../models/Notes.js');

function saveNote(req, res) {

    // console.log(req.body);
    console.log( "req.body.note: " + req.body.note);
    console.log("req.body.id: " + req.body.id);
    var newNote = new Note({ note: req.body.note });

    newNote.save(function (err, doc) {
        if (err) throw err;

        Article.findOneAndUpdate({ _id: req.body.id }, { $push: { note: newNote } }, { new: true }, function (err, doc) {
            if (err) throw err;
            console.log(doc);
            res.json(doc);
        });
    });
}

module.exports = {
    saveNote: saveNote
}