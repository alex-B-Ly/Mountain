$(document).ready(function() {

var map,
latLon;

// MAIN FUNCTION BEGIN

// 	WEATHER FUNCTION
	function generateWeather(){
		var weatherApiKey = '', // WEATHER API KEY GOES HERE
		placeSearch = $('#place-search').val();

		$.ajax({
			url: 'https://api.worldweatheronline.com/free/v2/weather.ashx?key=' + weatherApiKey + '&q=' + placeSearch + '&num_of_days=5&tp=12&includelocation=yes&format=json',
			type: 'GET',
			success: function(place){
				var placeName = place.data.nearest_area[0].areaName[0].value,
				placeRegion = place.data.nearest_area[0].region[0].value,
				lat = place.data.nearest_area[0].latitude,
				lng = place.data.nearest_area[0].longitude,
				date = new Date(),
				weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				today = weekdays[date.getDay()];

				latLon = [];
				latLon.push(lat);
				latLon.push(lng);

				// Pass weather data to table in html here
				$('.weather-table-place-name').html(placeName + ', ' + placeRegion);
					// run a loop based on num_of_days and build weather data rows in table.

				// Generate Map
				generateMap(parseFloat(latLon[0]), parseFloat(latLon[1]));
			},
			error: function(){
				console.log('Weather request failed');
			}
		});
	}

// 	MAP FUNCTION

	function generateMap(latitude, longitude){

	  var mapOptions = {
	    center: {lat: latitude, lng: longitude},
	    zoom: 12,
	    zoomControl: true,
	    zoomControlOptions: {
	      position: google.maps.ControlPosition.RIGHT_BOTTOM
	    }
	  }

		map = new google.maps.Map(document.getElementById('map'), mapOptions);
	}

// MAIN FUNCTION END

// FUNCTIONS CALLED
$('.place-search-button').on('click', generateWeather);

});