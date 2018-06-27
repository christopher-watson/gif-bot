// Giphy API key: GqKuRbnmfbn5LwTnRvQ5T03JwiVXXF7y

//Starter GIF Array
var buttonArray = ["Bruce Lee", "Lonzo Ball"];
var gifCount = 0;

//Function to display GIFs to HTML in sequence
function displayGif() {
  var gif = $(this).attr("gif-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=GqKuRbnmfbn5LwTnRvQ5T03JwiVXXF7y&q=" +
    gif +
    "&rating=pg-13&limit=10&offset=" +
    gifCount;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < 6; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("gif-div");
      var p = $("<p>");
      p.text(results[i].title + ' "' + results[i].rating + '"');
      var gifImage = $("<img>");
      gifImage.addClass("gif");
      gifImage.attr("src", results[i].images.fixed_width_still.url);
      gifImage.attr("still", results[i].images.fixed_width_still.url);
      gifImage.attr("animate", results[i].images.fixed_width.url);
      gifImage.attr("data-state", "still");
      gifImage.attr("alt", results[i].title);

      gifDiv.append(gifImage);
      gifDiv.append(p);

      $(".gif-container").prepend(gifDiv);
    }
  });
  console.log(gifCount);
}

//Function to display GIF buttons
function createButton() {
  $(".button-div").empty();
  for (var i = 0; i < buttonArray.length; i++) {
    var a = $("<button>");
    a.addClass("gif-button");
    a.attr("gif-name", buttonArray[i]);
    a.text(buttonArray[i]);
    a.attr("gifCount", gifCount);
    $(".button-div").append(a);
    console.log(a);
  }
}

//Function to handle GIF buttons
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  if ($("#gif-input").val() !== '') {
    var gifInput = $("#gif-input").val().trim();
    $("#gif-input").val("");
    buttonArray.push(gifInput);
  }
  createButton();
});

//Function to animate GIFs
function animate() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("animate"));
    $(this).attr("data-state", "animate");
  }
  if (state === "animate") {
    $(this).attr("src", $(this).attr("still"));
    $(this).attr("data-state", "still");
  }
}

function robotInvasion() {
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=GqKuRbnmfbn5LwTnRvQ5T03JwiVXXF7y&q=robot-invasion";
    

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < 6; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("gif-div");
      var p = $("<p>");
      p.text(results[0].title);
      var gifImage = $("<img>");
      gifImage.addClass("gif");
      gifImage.attr("src", results[0].images.fixed_width.url);
      gifImage.attr("still", results[0].images.fixed_width_still.url);
      gifImage.attr("animate", results[0].images.fixed_width.url);
      gifImage.attr("data-state", "animate");
      gifImage.attr("alt", results[i].title);

      gifDiv.append(gifImage);
      gifDiv.append(p);

      $(".gif-container").prepend(gifDiv);
    }
  });
}

function randomizer() {
  gifCount += 6;
}

function clear() {
  $(".gif-container").empty();
  gifCount = 0;
}

function info() {
  $.alert({
    title: "INFO",
    content:
      "Click on button to display GIFs" +
      "<br>" +
      "Create your own button in search bar" +
      "<br>" +
      "Press the robot for a ... ?" +
      "<br>",
    theme: "modern",
    // buttons: {
    //   Done: function() {
    //     //Be Done
    //   }
    // }
  });
}

$(document).on("click", ".gif-button", displayGif);
$(document).on("click", ".gif-button", randomizer);
$(document).on("click", ".gif", animate);
$("#header-text").on("click", clear);
$("#botlink").on("click", robotInvasion);
$("#info-button").on("click", info);
createButton();
