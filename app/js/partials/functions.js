var swiper = new Swiper('.swiper_parallax', {
	speed: 800,
	parallax: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

if (document.querySelectorAll('.main_video').length) {
	var player;

	function onYouTubePlayerAPIReady() {
		player = new YT.Player('ytplayer', {});
	};
	var int = setInterval(function () {
		if (player) {
			clearInterval(int);
		} else {
			player = new YT.Player('video_player', {});
		};
	}, 100);
}

//MAP
var marker1;

function initMap() {
	var zoomMap = 14;
	var mapCenter = new google.maps.LatLng(50.401651, 30.640107);

	var map = new google.maps.Map(document.getElementById('map'), {
		center: mapCenter,
		zoom: zoomMap,
		disableDefaultUI: true,
		scrollwheel: false,
		styles: [{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"color": "#e9e9e9"
			}, {
				"lightness": 17
			}]
		}, {
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [{
				"color": "#f5f5f5"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#ffffff"
			}, {
				"lightness": 17
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#ffffff"
			}, {
				"lightness": 29
			}, {
				"weight": 0.2
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [{
				"color": "#ffffff"
			}, {
				"lightness": 18
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [{
				"color": "#ffffff"
			}, {
				"lightness": 16
			}]
		}, {
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [{
				"color": "#f5f5f5"
			}, {
				"lightness": 21
			}]
		}, {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{
				"color": "#dedede"
			}, {
				"lightness": 21
			}]
		}, {
			"elementType": "labels.text.stroke",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#ffffff"
			}, {
				"lightness": 16
			}]
		}, {
			"elementType": "labels.text.fill",
			"stylers": [{
				"saturation": 36
			}, {
				"color": "#333333"
			}, {
				"lightness": 40
			}]
		}, {
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [{
				"color": "#f2f2f2"
			}, {
				"lightness": 19
			}]
		}, {
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#fefefe"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#fefefe"
			}, {
				"lightness": 17
			}, {
				"weight": 1.2
			}]
		}]
	});

	marker1 = new google.maps.Marker({
		position: mapCenter,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: {
			url: 'img/pin.png',
			size: new google.maps.Size(32, 32),
			anchor: new google.maps.Point(16, 32)
		}
	});

}; //end initMap

// Send contact form
$('.main_form').submit(function (event) {

    event.preventDefault();

    if ($('#form_check').is(':checked')) {
        return false;
    }
    $('input[type=submit]').val('Отправляется');
    $.ajax({
        type: "POST",
        url: '/wp-content/themes/marble/assets/libs/sendmail.php',
        dataType: 'json',
        data: $(this).serialize(),
        success: function (data) {
            if (data.status == 'true') {
                $('input[type=submit]').val('Отправлено');
                $(".main_form input[type='text'], input[type='email'], input[type='tel'], textarea").val(' ');
            }
        }
    });
});