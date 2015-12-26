$(document).ready(function() {

var map;

function generateMap(){

  var mapOptions = {
    center: {lat: 40.4995488, lng: -74.4443186},
    zoom: 12,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  }

	map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// FUNCTIONS CALLED
$('.search-button').on('click', generateMap);

});