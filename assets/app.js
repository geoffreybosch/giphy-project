
  var gifButtons = ["Shook", "Doge", "Salt Bae", "Arthur Fist"];
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
//This is used to cycle push 10 gifs into the gifBox div
  $(document).on('click', '#gifButton', function(){
    search = $(this).text();
    apiURL = `https://api.giphy.com/v1/gifs/search${apiKey}&q=${search}&limit=10&rating=pg13&lang=en`;
    $.ajax({
      url: apiURL,
      method: 'GET'
    }).then(function(response){
      console.log(response);
      $('#gifBox').html('');
        for (var i=0; i<10; i++){
            //<a> tag was added to toubleshoot a later step
            var gifDiv = $('<span>');
            var img = $('<img>');
            gifDiv.attr('class','loadedGIF');
            gifDiv.append(img);
            gifDiv.append(`<br>`)
            gifDiv.append(`The above GIF is rated: `)
            gifDiv.append(response.data[i].rating);
            gifDiv.append(`<br><br>`)
            img.attr('class',i)
            img.attr('class','shadow-lg rounded')
            img.attr('src',response.data[i].images.fixed_width_still.url);
            
            $('#gifBox').append(gifDiv);
        }
        $('#gifBox').prepend(`<p>If you want to see these gif's in motion, search them on <a href='http://www.giphy.com/search/${search}'>GIPHY</a>, as I couldn't figure that out without them all being animated:)</p>`)
    })
  })
//Here I tried to set a click event to one of the loaded gifs, but couldn't get a console log to work. I tried incasing each gif in an <a> tag but that didn't work either. Was just a shot in the dark.

  //First Attempt, tried to write as much code as possible even though it wasn't working.
$(document).on('click','#loadedGIF',function(){
    console.log('Hi!');
    $.ajax({
        url: apiURL,
        method: 'GET'
    }).then(function(response){
        this.attr('class','loadedGIF');
        var i = this
        gifDiv.html(img);
        img.attr('src',response.data[i].images.downsized_large.url);
        
        
        $('#gifBox').append(gifDiv)
    })
})
//Second Attempt, stopped after console log woulldn't work.
// $(document).ready(function () {
//     $('#loadedGIF').click(function () {
//         alert($(this).attr('src'));
//     });
// });  
  
//Used to put the inital array of buttons on the page.
  renderButtons()
