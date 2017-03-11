 $("#scraperButton").on("click", function(){
          console.log("Button Click Working");
          $.get(window.location.origin + '/data').done(function(scrapedData) {

            console.log(scrapedData);
          });
        /*$.get({
          method: "GET",
          url: window.location.origin + "/data",
        })
        .done(function(scrapedData){

           res.render("index", {element: articles});
        });
*/
 });