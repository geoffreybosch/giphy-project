
  var gifButtons = ["Shook", "Doge", "Salt Bae", "Aurthur Fist"];
  var apiKey = '?api_key=UPVjVwevOqPChTS9FFJ6lm8GhpmtVLPm';
  var search;
  var apiURL = `https://api.giphy.com/v1/gifs/search${apiKey}&q=${search}&limit=10&rating=g`;
  var q;


//Function that add builds the buttons html. This is run a page load and on button click when a user adds a new category.
  function renderButtons() {
    $('#buttons').html("");
    for (i=0; i < gifButtons.length; i++){
      var b = $('<button>');
      b.text(gifButtons[i]);
      b.attr('class', 'btn btn-info btn-sm');
      b.attr('id', 'gifButton');
      $('#buttons').append(b);
    }
    $('#addButton').on('click', function(){
      var newGif = $('#gifSearch').val();
    })
  }
  $("#addButton").on("click", function(event) {
    event.preventDefault();

    var newGif = $('#gifSearch').val();
    gifButtons.push(newGif);
    renderButtons();
    $('#gifSearch').val("");
  });
//This is used to cycle push 10 gifs into the gidBox div
  $(document).on('click', '#gifButton', function(){
    search = $(this).text();
    apiURL = `https://api.giphy.com/v1/gifs/search${apiKey}&q=${search}&limit=10&rating=pg13`;
    $.ajax({
      url: apiURL,
      method: 'GET'
    }).then(function(response){
      console.log(response);
      $('#gifBox').html('');
        for (var i=0; i<10; i++){
          //<a> tag was added to toubleshoot a later step
          var a = $('<a>');
          var img = $('<img>');
          a.attr('class','loadedGIF');
          a.html(img);
          
          img.attr('class',i)
          img.attr('src',response.data[i].images.fixed_width_still.url);
          
          
          $('#gifBox').append(a);
        }
    })
  })
//Here I tried to set a click event to one of the loaded gifs, but couldn't get a console log to work. I tried incasing each gif in an <a> tag but that didn't work either. Was just a shot in the dark.

  //First Attempt
$(document).on('click','#loadedGIF',function(){
    console.log('Hi!');
    $.ajax({
        url: apiURL,
        method: 'GET'
    }).then(function(response){
        this.attr('class','loadedGIF');
        var i = this
        a.html(img);
        img.attr('src',response.data.images.downsized_large.url);
        
        
        $('#gifBox').append(a)
    })
})
//Second Attempt
// $(document).ready(function () {
//     $('#loadedGIF').click(function () {
//         alert($(this).attr('src'));
//     });
// });  
  
//Used to put the inital array of buttons on the page.
  renderButtons()
