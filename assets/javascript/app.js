$(document).ready(function(){
	var imageURL = "";
	var rating = "";
	var picDiv = "";
	var image = "";

  var topicAnimals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "teacup pig", "serval", "salamander", "frog"];


	 function insertButtons() {
	 	$("#buttons-view").empty();

	 	for (var i = 0; i < topicAnimals.length; i++) {
	 		var myButton = $("<button>");
	 		myButton.attr("class", "buttonstyle");
	 		myButton.attr("data-value", topicAnimals[i]);
	 		myButton.text(topicAnimals[i]);

	 		$("#buttons-view").append(myButton);
	 		$(".genbuttons" + topicAnimals[i]).append(topicAnimals[i]);

	 	}
	 }

	 insertButtons()




	 $("#animal-input").on("click", function() {
	 	var myAnimal = $("#animal-input").val().trim();
	 	topicAnimals.push(myAnimal);
	 	insertButtons();
	 	console.log(topicAnimals)
	 });
// });

     $("#animal-form").on("keypress", function(){
     	if(event.keycode === 13) {
     		var myAnimal = $("#animal-input").val().trim();
     		topicAnimals.push(myAnimal);
     		insertButtons();
     		console.log(topicAnimals);
     	}
     });

  $("#buttons-view").on("click", "button", function() {

  	 var animal = $(this).attr("data-value");
  	 console.log(animal);

  	 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=f4f904d2f7d04da683a89b1ad02966a7&limit=10&rating=pg";
     

     $.ajax({
     	url: queryURL,
     	method: "GET"
     })

     .done(function(response) {
     	console.log(response);
     	var reply = response.data.length;
     	console.log(queryURL);
     	$("#view-animals").empty()
     	$("#msgReply").empty();

     	if (reply < 10) {
     		$("#msgReply").html("Your search only returned " + reply + " results");
      	}

      	if(response.Length === 0) {
      		$("#msgReply").html("Your search did not return any results");
      	}

      	for (var i = 0; i < reply; i++) {
      		imageUrl = response.data[i].images.original_still.url;
      		var imageUrlAnimate = response.data[i].images.original.url;
      		var imageUrlStill = response.data[i].images.original_still.url;
      	   rating = response.data[i].rating;
           picDiv = $("<div class= 'dyno dynadiv" + i + "'> <h3 class= 'rating'> Rating: " + rating + "</h3></div>");
           image = $("<img>");
           image.attr({ "class": "gifs",
                 "src": imageUrl,
                 "data-still": imageUrlStill,
                 "data-animate": imageUrlAnimate,
                 "data-state": "still",
                 "alt": "tvgiphy"
       });
           $("#view-animals").append(picDiv);
           $(".dynadiv" + i).append(image);
      }

     });
  });

  $("#view-animals").on("click", ".gifs", function() {

  	var motion = $(this).attr("data-state");

  	if(motion === "still") {
  		$(this).attr("src", $(this).attr("data-animate"));
  		$(this).attr("data-state", "animate");
  	} else {
  		$(this).attr("src", $(this).attr("data-still"));
  		$(this).attr("data-state", "still");
  	}
  })



});