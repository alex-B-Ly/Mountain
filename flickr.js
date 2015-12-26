$(document).ready(function() {


googleApiSuccessHandler();



//keypress function to show images
$("#selected-area").keypress(function(e) {
    if (e.which == 13) {
        setTimeout(function() {
            googleApiSuccessHandler();
            $("flickrRow").empty();
        },650)
    }
});


//builds photo urls, then builds the collection of photos
function buildThumbnail(photoData) {  
    var photoUrl = "https://farm" + photoData.farm; 
    photoUrl += ".staticflickr.com/" + photoData.server;
    photoUrl += "/" + photoData.id;
    photoUrl += "_" + photoData.secret + ".jpg";

    var colDiv = $("<div>").addClass("col-md-8");
    var photoImg = $("<img>").attr("src", photoUrl).attr("width", "300px");
    

    colDiv.append(photoImg);

    return colDiv;

  }

//images from flickr based on user location
    function googleApiSuccessHandler() {
    var flickrApiUrl = "https://api.flickr.com/services/rest/?";
    var flickrApiParams = {
      api_key: "82b02e63d4ac3aeb321e02eaa8b52369",
      method: "flickr.photos.search",
      format: "json",
      nojsoncallback: 1,
      lat: geoLocation.lat,
      lon: geoLocation.lng
    }
    
    $.ajax({
      type: "GET",
      url: flickrApiUrl + $.param(flickrApiParams),
      success: flickrSuccessHandler
    });

}
 // loops through all images and applies to page
  function flickrSuccessHandler(response) { 
    var locationPhotos = response.photos.photo; 
    for(var i = 0; i < 20; i++) {  
      var newCol = buildThumbnail(locationPhotos[i]);
      $("#flickrRow").append(newCol);

    }
  }
});