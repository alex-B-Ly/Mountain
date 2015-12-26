$(document).ready(function() {




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