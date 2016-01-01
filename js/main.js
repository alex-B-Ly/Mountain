$(document).ready(function() {

var map,
latLon,
photoCount=0;

// MAIN FUNCTION BEGIN

// 	WEATHER FUNCTION
	function generateWeather(){
		var weatherApiKey = '70a333c1d80dfac6e52cce8a8679a', // WEATHER API KEY GOES HERE
		placeSearch = $('#place-search').val();

		$.ajax({
			url: 'https://api.worldweatheronline.com/free/v2/weather.ashx?key=' + weatherApiKey + '&q=' + placeSearch + '&num_of_days=5&tp=24&includelocation=yes&format=json',
			type: 'GET',
			success: function(place){
				var placeName = place.data.nearest_area[0].areaName[0].value,
				placeRegion = place.data.nearest_area[0].region[0].value,
				placeWeather = place.data.weather,
				placeCurrentCondition = place.data.current_condition[0],
				lat = place.data.nearest_area[0].latitude,
				lng = place.data.nearest_area[0].longitude,
				date = new Date(),
				weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				weatherTableBody = $('.weather-table tbody');

				latLon = [];
				latLon.push(lat);
				latLon.push(lng);

				// Pass weather data to table in html here
				$('.weather-table-place-name').html(placeName + ', ' + placeRegion);
				// remove rows with weather-row class
				$('.weather-row').remove();
				// run a loop based on num_of_days and build weather data rows in table.
				for(var i=0; i<placeWeather.length; i++){
					var weatherRow = $('<tr>'),
					day = $('<td>'),
					cond = $('<td>'),
					maxTemp = $('<td>'),
					minTemp = $('<td>');

					// TODO Figure out the days, will probably have to use switch case inside if statements
					if(i===0){
						day.html('Today');
						cond.html(placeCurrentCondition.temp_F + ' F, ' + placeCurrentCondition.weatherDesc[0].value);
					}else if(i===1){
						day.html('Tomorrow');
					}else{
						day.html(weekdays[(date.getDay()+i) % 7]);
					}

					if(i>0){
						cond.html(placeWeather[i].hourly[0].weatherDesc[0].value);
					}
					maxTemp.html(placeWeather[i].maxtempF + ' F');
					minTemp.html((placeWeather[i].mintempF + ' F'));

					weatherRow.append(day).append(cond).append(maxTemp).append(minTemp).addClass('weather-row');
					weatherTableBody.append(weatherRow);
				}

				// Generate Map
				generateMap(parseFloat(latLon[0]), parseFloat(latLon[1]));
				// Generate Images
				generateImages(parseFloat(latLon[0]), parseFloat(latLon[1]), placeName);
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

// FLICKR FUNCTION

	function generateImages(latitude, longitude, name){
		// lat and lon will be passed from latLon, name will be passed into text
		var flickrUrl = 'https://api.flickr.com/services/rest/?',
		apiParams = {
			api_key: '82b02e63d4ac3aeb321e02eaa8b52369',
			method: 'flickr.photos.search',
			format: 'json',
			nojsoncallback: 1,
			lat: latitude,
			lon: longitude,
			tag: name
		}

		$.ajax({
			url: flickrUrl + $.param(apiParams),
			type: 'GET',
			success: function(photoData){
				var photoArray = photoData.photos.photo;

				// PhotoCount is a global var.  This for loop will have to be moved into new ajax call function
				for(var i=0; i<3; i++){
					console.log(photoArray[photoCount]);
					photoCount++;
					console.log(photoCount);
				}
			}
		});
	}

// MAIN FUNCTION END

// FUNCTIONS CALLED
$('.place-search-button').on('click', generateWeather);

});