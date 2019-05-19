let aqiDiv = document.getElementById("AQI");

// api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}
//let apiLatLngCall = "/api/visualair/38.23/-122.2";

let button = document.createElement("button");

let t = document.createTextNode("run");

button.appendChild(t);

document.body.appendChild(button);

function setAirVisual_InfoWindow(coordinates) {
    let nearestSensorWindow = new google.maps.InfoWindow({
        content: "Nearest AirVisual Sensor",
        position: coordinates
    });

    nearestSensorWindow.open(map);
}

const userAction = async () => {
    let IPcall = 'api.airvisual.com/v2/nearest_station?key={83yc73pHs93hEpSyo}';

    const ipResponse = await fetch(IPcall);
    const ipJSON = await ipResponse.json();

    console.log(ipJSON);

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
        $("#windSpeed").text(myJson.data.current.weather.ws + " mph");
        // let windCardinalDirection = setWindDirection(myJson);
        //console.log("before assignment, wind card =: " + windCardinalDirection);
        $("#windDirection").text(setWindDirection(myJson));

        let airVisualSensorCoords = {
            lat: myJson.data.location.coordinates[1],
            lng: myJson.data.location.coordinates[0]
        };
        setAirVisual_InfoWindow(airVisualSensorCoords)
    }
};

function setWindDirection(someJSON) {
    console.log("WindDirection function called");
    console.log("Wind direction is: " + someJSON.data.current.weather.wd);

    let windAngle = someJSON.data.current.weather.wd;
    let windCardinalDirection = null;
    //this seems verbose, perhaps an enum can be used here?
    if (windAngle <= 15 || windAngle >= 345) {
        windCardinalDirection = "N";
    }

    if (15 < windAngle && windAngle < 85) {
        windCardinalDirection = "NE";
    }

    if (85 <= windAngle && windAngle <= 105) {
        windCardinalDirection = "E"
    }

    if (105 < windAngle && windAngle < 165) {
        windCardinalDirection = "SE"
    }

    if (165 <= windAngle && windAngle <= 195) {
        windCardinalDirection = "S"
    }

    if (195 < windAngle && windAngle < 255) {
        windCardinalDirection = "SW"
    }

    if (255 <= windAngle && windAngle <= 285) {
        windCardinalDirection = "W"
    }

    if (285 < windAngle && windAngle < 345) {
        windCardinalDirection = "NW"
    }

    console.log("Wind cardinal is: " + windCardinalDirection);

    return windCardinalDirection;
}

function geocodeLatLng(geocoder, mapToUse, infowindow, latlng) {
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                let marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent("Your Location: " + results[6].formatted_address);
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