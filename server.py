import requests

from flask import Flask, send_from_directory
app = Flask(__name__)

API_KEY = "83yc73pHs93hEpSyo"
AIR_URL = "https://api.airvisual.com/v2/nearest_city?lat={LATITUDE}&lon={LONGITUDE}&key={YOUR_API_KEY}"


@app.route('/api/visualair/<latitude>/<longitude>')
def visual_air_api(latitude, longitude):
    # latitude = 38.23
    # longitude = -122.63
    response = requests.get(AIR_URL.format(
        LATITUDE=latitude,
        LONGITUDE=longitude,
        YOUR_API_KEY=API_KEY
    ))
    return response.text

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/')
def send_html():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

