let aqiDiv = document.getElementById("AQI");
let latitude = 38.23;
let longitude = -122.63;

// api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}
let apiLatLngCall = "/api/visualair/38.23/-122.2"

const userAction = async () => {
    const response = await fetch(apiLatLngCall);
    const myJson = await response.json(); //extract JSON from the http response

    aqiDiv = myJson;
    console.log(myJson);
    $("#state").text(myJson.data.state);
}

// activate with env\scripts\activate
// launch with .\server.py