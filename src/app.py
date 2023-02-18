from flask import Flask,request,render_template
import pandas as pd
import numpy as np
import tensorflow as tf
import datetime as dt
import yfinance as yf
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
import keras
from keras.models import load_model
app = Flask(__name__)

model = load_model('C:/Users/Dell/OneDrive/Desktop/DST project/src/models/keras_model.h5')

@app.route('/')
def index():
   return render_template('index.html')

@app.route("/predict", methods = ['POST', 'GET'])
def predict():
    if request.method == 'POST':
        params = request.form['Name']
        start = dt.datetime(2010,1,1)
        end = dt.datetime(2019,12,31)

        df = yf.download(params,start,end)

        data_training = pd.DataFrame(df['Close'][0:int(len(df)*0.70)])
        data_testing = pd.DataFrame(df['Close'][int(len(df)*0.70): int(len(df))])

        scaler = MinMaxScaler(feature_range=(0,1))
        data_training_array = scaler.fit_transform(data_training)
        past_100_days = data_training.tail(100)

        final_df = past_100_days.append(data_testing, ignore_index = True)

        input_data = scaler.fit_transform(final_df)

        x_test = []
        y_test = []

        for i in range(100, input_data.shape[0]):
            x_test.append(input_data[i-100:i])
            y_test.append(input_data[i,0])
            
        x_test, y_test = np.array(x_test), np.array(y_test)
        y_predicted = model.predict(x_test)
        scaler = scaler.scale_
        scale_factor = 1/scaler[0]
        y_predicted = y_predicted * scale_factor
        y_test = y_test * scale_factor
        plt.clf()
        plt.plot(y_test, 'b', label = 'Original Price')
        plt.plot(y_predicted, 'r', label = 'Predicted Price')
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.legend()
        plt.savefig('C:/Users/Dell/OneDrive/Desktop/DST project/src/static/images/new_plot.png')
        return render_template("result.html",name = 'new_plot', url ='/static/images/new_plot.png')
app.run(host='0.0.0.0') 