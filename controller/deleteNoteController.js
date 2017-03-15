var Article = require('../models/Article.js');
var Note = require('../models/Notes.js');

function deleteNote(req, res) {
    console.log(req.body);
    Article.findOneAndUpdate({ _id: req.body.articleid }, { $pull: { notes: req.body.noteid } }, function (err, doc) {
        if (err) console.log(err);
        console.log(doc);
    });
    Note.remove({ _id: req.body.noteid }, function (err, doc) {
        if (err) console.log(err);
        console.log(doc);
    });
}

module.exports = {
    deleteNote: deleteNote
}