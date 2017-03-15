var deleteArticleController = require('../controller/deleteArticleController.js');



module.exports = function (app) {
    app.post('/deleteArticle', deleteArticleController.deleteArticle);

};
     


