$(document).ready(function () {
  //On the scraperButton, we have an event listener that performs an AJAX call that is a GET request on the data route. When a get request is made on the data route, it performs the scraper. That can be found in dataRoute.js in the routes folder. That data is returned as a json.
  $("#scraperButton").on("click", function () {
    $.ajax({
      method: "GET",
      url: window.location.origin + "/data",
    })
      //After the data is returned as a json, the function below takes the scrapedData, and for each instance of it, appends it to the DOM in the panelContainer. 
      .done(function (scrapedData) {
        if (scrapedData !== "No new Articles"){
          for (i = 0; i < scrapedData.length; i++) {
            console.log(scrapedData[i].title);
            console.log(scrapedData[i].link);
            console.log("Begin scraping");
            //Creating a panel for the heading and body to lay in. Need to close it after the panel body is inserted. 
            //Creating a variable name newPanelDiv for my panelTitle and panelBody to be placed inside of.
            var newPanelDiv = $('<div>');
            newPanelDiv.addClass('panel panel-default');
            newPanelDiv.attr('id', scrapedData[i]._id);

            //Here, I am creating a variable name panelTitle, which will later contain the title of the article as a hyperlink to the actual article on appleInsider. 
            var panelTitle = $('<div>');
            panelTitle.addClass('panel-heading');

            //Creating a variable name panelBody, which will later contain the postDescription from appleInsider. 
            var panelBody = $('<div>');
            panelBody.addClass('panel-body');

            //Creating a variable named title which is the title for each article from appleInsider.
            var title = $('<h3>');
            title.text(scrapedData[i].title);

            //Creating a variable named link which is the link in an a tag, which I will put the title inside later on to make the title a hyperlink. 
            var link = $('<a>');
            link.addClass('panel-body');
            link.attr('href', scrapedData[i].link);
            link.attr('target', '_blank');

            //Creating a variable named body, which is the postDescription from appleInsider. 
            var body = $('<p>');
            body.text(scrapedData[i].postDescription);

            //Creating a button so that the data from the panel will be saved to the database.
            var button = $('<div>');
            button.addClass('btn btn-primary save-article');
            button.text('Save Article');

            //Appening the title text inside the link so that the title will be a hyperlink to the article. 
            link.append(title);
            //Appending link to the panelTitle section, so that it is the header of the panel.
            panelTitle.append(link);
            //Appending the body to the panelBody so that the body text is the postDescription from apple appleInsider.
            panelBody.append(body);
            //Appending the button to the panelBody section. 
            panelBody.append(button);
            //Appending everything inside the newPanelDiv container.
            newPanelDiv.append(panelTitle);
            newPanelDiv.append(panelBody);
            //Appending newPanelDiv to the page inside the div with an id of #panelContainer.
            $('#panelContainer').append(newPanelDiv);

          }
        }else{
          $('#noNewArticlesModal').modal('toggle');
        }
      });
  });

  $(document).on('click', '.save-article', function () {

    // console.log({title: title, link: link});
    $(this).parent().parent().remove();
    // console.log({title: title, link: link});
    $.post('/saveNewArticle' ).done(function (postedData) {
      console.log(postedData);
    });
  });
})