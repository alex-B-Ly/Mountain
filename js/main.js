$(document).ready(function() {

var map,
latLon;

// MAIN FUNCTION BEGIN

// 	WEATHER FUNCTION
	function generateWeather(){
		var weatherApiKey = '70a333c1d80dfac6e52cce8a8679a', // WEATHER API KEY GOES HERE
		placeSearch = $('#place-search').val();

		$.ajax({
			url: 'https://api.worldweatheronline.com/free/v2/weather.ashx?key=' + weatherApiKey + '&q=' + placeSearch + '&num_of_days=5&tp=12&includelocation=yes&format=json',
			type: 'GET',
			success: function(place){
				var placeName = place.data.nearest_area[0].areaName[0].value,
				placeRegion = place.data.nearest_area[0].region[0].value,
				lat = place.data.nearest_area[0].latitude,
				lng = place.data.nearest_area[0].longitude;

				latLon = [];
				latLon.push(lat);
				latLon.push(lng);

				// Pass weather data to table in html here
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