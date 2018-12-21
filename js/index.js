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
        });
        const response = await fetch(apiLatLngCall);
        const myJson = await response.json(); //extract JSON from the http response

        console.log(myJson);
        $("#state").text(myJson.data.city);
        $("#AQI").text(myJson.data.current.pollution.aqius);

        let airVisualSensorCoords = {
            lat: myJson.data.location.coordinates[1],
            lng: myJson.data.location.coordinates[0]
        };
        setAirVisual_InfoWindow(airVisualSensorCoords)
    }
};


button.addEventListener("click", userAction);


// activate with env\scripts\activate
// launch with .\server.py