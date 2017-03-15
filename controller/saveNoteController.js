var Article = require('../models/Article.js');
var Note = require('../models/Note.js');

function saveNote(req, res) {

    // console.log(req.body);
    console.log( "req.body.note: " + req.body.note);
    var newNote = new Note({ note: req.body.note });

    newNote.save(function (err, doc) {
        if (err) throw err;

        Article.findOneAndUpdate({ _id: req.body.id }, { $push: { notes: newNote } }, { new: true }, function (err, doc) {
            if (err) throw err;
            console.log(doc);
            res.json(doc);
        });
    });
}

module.exports = {
    saveNote: saveNote
}