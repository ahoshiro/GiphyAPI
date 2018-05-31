$(document).ready(function() {

    var topics = ["audi", "bmw", "chevrolet", "honda", "nissan", "mazda", "mitsubishi", "ford", "toyota", "lexus", "acura", "subaru", "volkswagen"];
    var imageData = [];
    function renderButtons() {
        // (this is necessary otherwise we will have repeat buttons)
        $("#selectionButton").empty();
        // Looping through the array of cars
        for (var i = 0; i < topics.length; i++) {
            console.log(topics.length);
            // Then dynamicaly generating buttons for each car in the array.
            var a = $("<button>");
            // Adding a class
            a.addClass("topics");
            // Adding a data-attribute with a value of the car at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the car at index i
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#selectionButton").append(a);
        }
    }
    $("#submitButton").on("click", function(event) {
        
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var topic = $("#userInput").val().trim();
        // The car from the textbox is then added to our array
        topics.push(topic);

        // calling renderButtons which handles the processing of our topics array
        renderButtons();
    });

    //Retrieves data from the Giphy API via AJAX. 
    $("#selectionButton").on("click","button",function(){
        var car =$(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=GvMqW6L15UQMBYxXWLftqvlnNQAfXFfD&limit=10";
        console.log(car)
        console.log(this);
        console.log(queryURL);
        // Ajax link to get the gifs
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) {
        // Storing an array of results in the results variable
            var results = response.data;
            imageData = [];
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                
                var animatedGif = ("src", results[i].images.fixed_height.url);
                var gifDiv = $("<div/>",{
                    class: 'item',
                    id: [i],
                });
    
                // Storing the result item's rating
                var rating = results[i].rating;
                imageData.push(animatedGif);
                
    
               // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
                var iteration = $("iterator").text("iteration" + [i])
                    
                // Creating an image tag
                var carImage = $("<img>");
                
    
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                carImage.attr("src", results[i].images.fixed_height_still.url);
                 
               // Appending the paragraph and personImage we created to the "gifDiv" div we created
               gifDiv.append(p);
               gifDiv.append(carImage);
               
    
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#images").prepend(gifDiv);
                }
            }
        });
    
    });
    
  
    $("#images").on("click",".item", function() {
        console.log(imageData);
        console.log(this);
       // var elementNum = $(this).getElementById("#id").value;
       // console.log(elementNum);
        var str = imageData["9"];

        console.log(str);
          
        $(this).attr("src", $(this).attr(str));

        
  
    //   var state = $(this).attr("data-state");

    //   if(state==="still") {
    //     $(this).attr("src",$(this).attr("data-animate"));
    //     $(this).attr("data-state","animate");
    //   } else {
    //     $(this).attr("src",$(this).attr("data-still"));
    //     $(this).attr("data-state","still");
    //   }
   
    });

    renderButtons ();
});