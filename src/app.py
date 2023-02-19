from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
from flask import Flask, request, render_template
import pandas as pd
import numpy as np
import datetime as dt
import yfinance as yf
import math
from sklearn.metrics import mean_squared_error
import matplotlib
matplotlib.use('Agg')
app = Flask(__name__)

model = load_model(
    'C:/Users/Dell/OneDrive/Desktop/DST project/src/models/keras_model.h5')


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/predict", methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        params = request.form['Name']
        df1 = pd.read_csv(
            'C:/Users/Dell/OneDrive/Desktop/DST project/src/Yahoo-Finance-Ticker-Symbols.csv')
        df1_new = df1[df1['Ticker'] == params]
        if df1_new.empty:
            return render_template('index.html', error="Enter a valid ticker!!")
        start = dt.datetime(2010, 1, 1)
        end = dt.date.today()

        df = yf.download(params, start, end)
        df = df.reset_index()
        open, high, low, close, adj_close, volume = df['Open'].iloc[-1], df['High'].iloc[-1], df[
            'Low'].iloc[-1], df['Close'].iloc[-1], df['Adj Close'].iloc[-1], df['Volume'].iloc[-1]

        data_training = pd.DataFrame(df['Close'][0:int(len(df)*0.70)])
        data_testing = pd.DataFrame(
            df['Close'][int(len(df)*0.70): int(len(df))])

        scaler = MinMaxScaler(feature_range=(0, 1))
        data_training_array = scaler.fit_transform(data_training)
        past_100_days = data_training.tail(100)

        final_df = past_100_days.append(data_testing, ignore_index=True)

        input_data = scaler.fit_transform(final_df)

        x_test = []
        y_test = []

        for i in range(100, input_data.shape[0]):
            x_test.append(input_data[i-100:i])
            y_test.append(input_data[i, 0])

        x_test, y_test = np.array(x_test), np.array(y_test)
        y_predicted = model.predict(x_test)
        y_predicted = scaler.inverse_transform(y_predicted)
        y_test = y_test.reshape(-1, 1)
        y_test = scaler.inverse_transform(y_test)
        rmse = math.sqrt(mean_squared_error(y_test, y_predicted))
        year = dt.date.today().year
        d = dt.datetime(year-2, 1, 4)
        df2 = df[df['Date'] == d]
        ind = df2.index[0]

        last_100_days = data_testing.tail(100)
        inp_data = scaler.fit_transform(last_100_days)
        x_forecast = []
        for i in range(100, inp_data.shape[0]+1):
            x_forecast.append(inp_data[i-100:i])
        x_forecast = np.array(x_forecast)
        for i in range(0, 7):
            y_forecast = model.predict(x_forecast)
            temp = np.asarray(y_forecast[-1]).reshape(1, 1)
            x_temp = x_forecast[len(x_forecast)-1][1:100]
            x_temp = np.append(x_temp, temp, axis=0)
            x_temp = np.asarray(x_temp).reshape(1, 100, 1)
            x_forecast = np.append(x_forecast, x_temp, axis=0)
        y_forecast = scaler.inverse_transform(y_forecast)
        plt.clf()
        fig = plt.figure()
        plt.plot(df['Date'][ind:int(len(df))], df['Close'][ind:int(len(df))])
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.grid()
        fig.autofmt_xdate()
        plt.savefig(
            'C:/Users/Dell/OneDrive/Desktop/DST project/src/static/images/recent_trend.png')

        ma100 = df.Close.rolling(100).mean()
        plt.figure()
        plt.plot(df['Date'][0:int(len(df))], df['Close']
                 [0:int(len(df))], label="Closing Price")
        plt.plot(df['Date'][0:int(len(df))], ma100, 'r',
                 label="100-day Moving Average (MA)")
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.grid()
        plt.legend()
        fig.autofmt_xdate()
        plt.savefig(
            'C:/Users/Dell/OneDrive/Desktop/DST project/src/static/images/ma100.png')

        ma200 = df.Close.rolling(200).mean()
        plt.figure()
        plt.plot(df['Date'][0:int(len(df))], df['Close']
                 [0:int(len(df))], label="Closing Price")
        plt.plot(df['Date'][0:int(len(df))], ma100, 'r',
                 label="100-day Moving Average (MA)")
        plt.plot(df['Date'][0:int(len(df))], ma200, 'g',
                 label="200-day Moving Average (MA)")
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.grid()
        plt.legend()
        fig.autofmt_xdate()
        plt.savefig(
            'C:/Users/Dell/OneDrive/Desktop/DST project/src/static/images/ma100_200.png')

        fig = plt.figure()
        plt.plot(df['Date'][int(len(df)*0.70): int(len(df))],
                 y_test, 'b', label='Original Price')
        plt.plot(df['Date'][int(len(df)*0.70): int(len(df))],
                 y_predicted, 'r', label='Predicted Price')
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.grid()
        plt.legend()
        fig.autofmt_xdate()
        plt.savefig(
            'C:/Users/Dell/OneDrive/Desktop/DST project/src/static/images/actual_vs_predicted.png')
        return render_template("result.html", name=params, url1='/static/images/recent_trend.png', url2='/static/images/ma100.png', url3='/static/images/ma100_200.png', url4='/static/images/actual_vs_predicted.png', open=open, high=high, low=low, close=close, adj_close=adj_close, volume=volume, rmse=rmse, forecast=y_forecast)


app.run(host='0.0.0.0')
