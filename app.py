from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/soil_sensors')
def soil_sensors():
    return render_template('soil_sensors.html')

if __name__ == '__main__':
    app.run(debug=True)
