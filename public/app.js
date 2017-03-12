 $("#scraperButton").on("click", function(){
          
        $.ajax({
          method: "GET",
          url: window.location.origin + "/data",
        })
        .done(function(scrapedData){
          for(i=0; i<scrapedData.length; i++){
            var articlePanel = $("<div>").addClass("panel panel-default");

            var articleHeading = $("div").addClass("panel-heading").text(scrapedData.title);

            var articleBody = $("div").addClass("panel-body").text(scrapedData.link);
            
            articlePanel.append(articleHeading).append(articleBody);
            $("#panelContainer").append(articlePanel);
          }

        });

 });