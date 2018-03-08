// Giphy API key: GqKuRbnmfbn5LwTnRvQ5T03JwiVXXF7y

//Starter GIF Array
var buttonArray = ["Bruce Lee", "Lonzo Ball"];

//Function to display GIFs to HTML in sequence
function displayGif() {
  var gif = $(this).attr("gif-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=GqKuRbnmfbn5LwTnRvQ5T03JwiVXXF7y&q=" +
    gif;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < 5; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("gif-div");
      var p = $("<p>");
      p.text(results[i].title);
      var gifImage = $("<img>");
      gifImage.attr("src", results[i].images.fixed_width.url);
      gifImage.attr("still", results[i].images.fixed_width_still.url);
      gifImage.attr("animate", results[i].images.fixed_width.url);
      gifImage.attr("alt", results[i].title);

      gifDiv.append(gifImage);
      gifDiv.append(p);

      $(".gif-container").prepend(gifDiv);
    }
  });
}

//Function to display GIF buttons
function createButton() {
  $(".button-div").empty();
  for (var i = 0; i < buttonArray.length; i++) {
    var a = $("<button>");
    a.addClass("gif-button");
    a.attr("gif-name", buttonArray[i]);
    a.text(buttonArray[i]);
    $(".button-div").append(a);
    console.log(a);
  }
}


//Function to handle GIF buttons
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  if($('#gif-input').val() !== ''){
    var gifInput = $("#gif-input").val().trim();
    $('#gif-input').val('');
    buttonArray.push(gifInput);
  }
  createButton();
});

$(document).on("click", ".gif-button", displayGif);
createButton();