let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //this is an arbitrary center in SF just to initialize the map
        center: {lat: 37.77, lng: -122.42},
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
/*
            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location');
            infoWindow.open(map);
            */
            map.setCenter(pos);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}