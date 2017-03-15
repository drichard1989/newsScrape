var addNoteController = require('../controller/addNoteController.js');

module.exports = function (app) {

    app.post('/addNote', addNoteController.addNote);

};



