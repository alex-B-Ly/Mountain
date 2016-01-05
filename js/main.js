$(document).ready(function() {

// MAIN FUNCTION BEGIN

var map,
latLon,
photoCount=0;

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
						cond.html(placeCurrentCondition.temp_F + '&deg; F, ' + placeCurrentCondition.weatherDesc[0].value);
					}else if(i===1){
						day.html('Tomorrow');
					}else{
						day.html(weekdays[(date.getDay()+i) % 7]);
					}

					if(i>0){
						cond.html(placeWeather[i].hourly[0].weatherDesc[0].value);
					}
					maxTemp.html(placeWeather[i].maxtempF + '&deg; F');
					minTemp.html((placeWeather[i].mintempF + '&deg; F'));

					weatherRow.append(day).append(cond).append(maxTemp).append(minTemp).addClass('weather-row').addClass('text-left');
					weatherTableBody.append(weatherRow);
				}

				// Generate Place Titles
				$('.flickr-place-title').html('Pictures around ' + placeName);
				// Generate Map
				generateMap(parseFloat(latLon[0]), parseFloat(latLon[1]));
				// Generate Images
				generateImages(parseFloat(latLon[0]), parseFloat(latLon[1]), placeName);
				// Display Weather and Images
				$('.weather-table').fadeIn(400);
				$('.image-area').fadeIn(400);
			},
			error: function(){
				console.log('Weather request failed');
			}
		});
	}

// 	MAP FUNCTION

	function generateMap (latitude, longitude){

	  var mapOptions = {
		center: {lat: latitude, lng: longitude},
		zoom: 12,
		zoomControl: true,
		// Use Snazzymaps.com to customize the style of the map.
		   styles: [
	{
		"elementType": "geometry",
		"stylers": [
			{
				"hue": "#ff4400"
			},
			{
				"saturation": -68
			},
			{
				"lightness": -4
			},
			{
				"gamma": 0.72
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "labels.icon"
	},
	{
		"featureType": "landscape.man_made",
		"elementType": "geometry",
		"stylers": [
			{
				"hue": "#0077ff"
			},
			{
				"gamma": 3.1
			}
		]
	},
	{
		"featureType": "water",
		"stylers": [
			{
				"hue": "#00ccff"
			},
			{
				"gamma": 0.44
			},
			{
				"saturation": -33
			}
		]
	},
	{
		"featureType": "poi.park",
		"stylers": [
			{
				"hue": "#44ff00"
			},
			{
				"saturation": -23
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"hue": "#007fff"
			},
			{
				"gamma": 0.77
			},
			{
				"saturation": 65
			},
			{
				"lightness": 99
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"gamma": 0.11
			},
			{
				"weight": 5.6
			},
			{
				"saturation": 99
			},
			{
				"hue": "#0091ff"
			},
			{
				"lightness": -86
			}
		]
	},
	{
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [
			{
				"lightness": -48
			},
			{
				"hue": "#ff5e00"
			},
			{
				"gamma": 1.2
			},
			{
				"saturation": -23
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"saturation": -64
			},
			{
				"hue": "#ff9100"
			},
			{
				"lightness": 16
			},
			{
				"gamma": 0.47
			},
			{
				"weight": 2.7
			}
		]
	}
],
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
			text: name
		}

		$('.first-img-row').empty();
		$('.second-img-row').empty();

		var imgTdCount = 0;

		$.ajax({
			url: flickrUrl + $.param(apiParams),
			type: 'GET',
			success: function(photoData){
				var photoArray = photoData.photos.photo,
				table = $('.image-table tbody'),
				row1 = $('.first-img-row'),
				row2 = $('.second-img-row');
				
				// Build images into table
				function initRowBuild(){
					$('.first-img-row').empty();
					$('.second-img-row').empty();
				  imageBuilder(photoArray[imgTdCount], row1);
				  while(imgTdCount%6 !== 0){
						imageBuilder(photoArray[imgTdCount], row1);
				  }
				  while(imgTdCount%12 !== 0){
						imageBuilder(photoArray[imgTdCount], row2);
				  }
				  $('.place-img').on('click', showImage);
				}

				// Previous images function
				function prevImgTdCount(){
					if(imgTdCount>12){
						imgTdCount = imgTdCount - 24;
					}else{
						imgTdCount = 0;
					}
					initRowBuild();
				}

				// Image Modal function
				function showImage(){
					$('.modal-pic').attr('src', $(this).attr('src'));
					$('.modal-pic-description').html($(this).attr('title'));
					$('#image-modal').modal('toggle');
				}

				// Functions called and bound within generateImage
				initRowBuild();

				$('.next-images').on('click', initRowBuild);
				$('.prev-images').on('click', prevImgTdCount);
			}
		});

		function imageBuilder(currentPhoto, row){
			var photoUrl = 'https://farm' + currentPhoto.farm;
			photoUrl += '.staticflickr.com/' + currentPhoto.server;
			photoUrl += '/' + currentPhoto.id + '_' + currentPhoto.secret + '.jpg';

			var imageTd = $('<td>'),
			photoCreated = $('<img>').addClass('img-responsive').addClass('place-img').attr('src', photoUrl).attr('title', currentPhoto.title);

			imageTd.append(photoCreated);
			row.append(imageTd);

			imgTdCount++;
		}

	}



// FUNCTIONS BOUND
	$('.place-search-button').on('click', generateWeather);
	$('#place-search').keyup(function(e){
		if(e.keyCode == 13){
			generateWeather();
		}
	});
// MAIN FUNCTION END



});