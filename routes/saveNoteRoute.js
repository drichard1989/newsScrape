var saveNoteController = require('../controller/saveNoteController.js');

module.exports = function (app) {

    app.post('/saveNote', saveNoteController.saveNote);

};



