var deleteNoteController = require('../controller/deleteNoteController.js');

module.exports = function (app) {
    app.post('/deleteNote', deleteNoteController.deleteNote);
};