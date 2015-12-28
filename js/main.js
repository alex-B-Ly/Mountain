$(document).ready(function() {

var map,
latLon = [];

// MAIN FUNCTION BEGIN

// 	WEATHER FUNCTION
	function generateWeather(){
		var weatherApiKey = '', // WEATHER API KEY GOES HERE
		placeSearch = $('#place-search').val();

		$.ajax({
			url: 'https://api.worldweatheronline.com/free/v2/weather.ashx?key=' + weatherApiKey + '&q=' + placeSearch + '&num_of_days=5&tp=12&includelocation=yes&format=json',
			type: 'GET',
			success: function(place){
				console.log(place);
			},
			error: function(){
				console.log('Weather request failed');
			}
		});
	}

// 	MAP FUNCTION

// 	function generateMap(latitude, longitute){

// 	  var mapOptions = {
// 	    center: {lat: latitude, lng: longitude},
// 	    zoom: 12,
// 	    zoomControl: true,
// 	    zoomControlOptions: {
// 	      position: google.maps.ControlPosition.RIGHT_BOTTOM
// 	    }
// 	  }

// 		map = new google.maps.Map(document.getElementById('map'), mapOptions);
// 	}

// MAIN FUNCTION END

// FUNCTIONS CALLED
$('.place-search-button').on('click', generateWeather);

});