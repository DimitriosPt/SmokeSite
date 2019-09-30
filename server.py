import requests
from env import AIR_URL, API_KEY, AIR_IP_URL

from flask import Flask, send_from_directory, jsonify
app = Flask(__name__)


@app.route('/api/visualair/<latitude>/<longitude>')
def visual_air_api(latitude, longitude):

    air_url = AIR_URL
    response = requests.get(air_url.format(
        LATITUDE=latitude,
        LONGITUDE=longitude,
        YOUR_API_KEY=API_KEY
    ))
    return response.text

@app.route('/api.airvisual.com/v2/nearest_station?key={API_KEY}')
def visual_air_IP():

    air_ip_url=AIR_IP_URL
    response = requests.get(air_ip_url.format(
        YOUR_API_KEY = API_KEY
    ))
    return response.text


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


@app.route('/Style/<path:path>')
def send_css(path):
    return send_from_directory('Style', path)


@app.route('/')
def send_html():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

