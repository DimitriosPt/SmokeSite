let aqiDiv = document.getElementById("AQI");

// api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}
//let apiLatLngCall = "/api/visualair/38.23/-122.2";

let button = document.createElement("button");

let t = document.createTextNode("run");

button.appendChild(t);

document.body.appendChild(button);

function setAirVisual_InfoWindow(coordinates)
{
    let nearestSensorWindow = new google.maps.InfoWindow({
        content: "Nearest AirVisual Sensor",
        position: coordinates
    });

    nearestSensorWindow.open(map);

}

const userAction = async () => {
    let apiLatLngCall = '/api/visualair/${latitude}/${longitude}';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };


            let geocoder = new google.maps.Geocoder();
            let geoInfoWindow = new google.maps.InfoWindow;

            geocodeLatLng(geocoder, map, geoInfoWindow, pos);
        });
        const response = await fetch(apiLatLngCall);
        const myJson = await response.json(); //extract JSON from the http response

        console.log(myJson);

        $("#AQI").text(myJson.data.current.pollution.aqius);

        let airVisualSensorCoords = {
            lat: myJson.data.location.coordinates[1],
            lng: myJson.data.location.coordinates[0]
        };
        setAirVisual_InfoWindow(airVisualSensorCoords)


    }
};

function geocodeLatLng(geocoder, mapToUse, infowindow, latlng)
{
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                let marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent("Your Location: "+ results[6].formatted_address);
                infowindow.open(map, marker);
                console.log(results[3].formatted_address);
                let locationResults = results[6].formatted_address;
                let city = (locationResults.split(','))[0];
                $("#state").text(city);
                console.log(results);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });

}

button.addEventListener("click", userAction);


// activate with env\scripts\activate
// launch with .\server.py