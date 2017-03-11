 $("#scraperButton").on("click", function(){
          
        $.ajax({
          method: "GET",
          url: window.location.origin + "/data",
        })
        .done(function(scrapedData){

          //Why you no work
           res.render("index", {element: articles});
        });

 });