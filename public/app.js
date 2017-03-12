 $("#scraperButton").on("click", function(){
          
        $.ajax({
          method: "GET",
          url: window.location.origin + "/data",
        })
        .done(function(scrapedData){
          for(i=0; i<scrapedData.length; i++){

            console.log("Begin scraping");
            // inside #panelContainer, we are going to first append a panel heading div with the heading text, and then we are goign to append the panelText. 
            $("#panelContainer").append("<div class='panel-heading>" + scrapedData[i].title + "</div>");
            $("#panelContainer").append("<div class='panel-body>" + scrapedData[i].link + "</div>");


          }

        
        });

 });