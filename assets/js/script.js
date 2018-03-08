// Giphy API GqKuRbnmfbn5LwTnRvQ5T03JwiVXXF7y
var buttonArray = ["bruce lee", "ball"];

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

createButton();

$("button").on("click", function() {
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
    
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='gif-resize'>");
      var p = $("<p>");
      p.text(results[i].title);
      var gifImage = $("<img>");
      gifImage.attr("src", results[i].images.fixed_width.url);
      gifImage.attr("still", results[i].images.fixed_width_still.url);
      gifImage.attr("animate", results[i].images.fixed_width.url);
      gifImage.attr("alt", results[i].title);

      gifDiv.append(gifImage);
      gifDiv.append(p);

      $(".gif-div").prepend(gifDiv);
    }
  });
});
