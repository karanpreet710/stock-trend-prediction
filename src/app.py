from flask import Flask,request,render_template
import pandas as pd
import numpy as np
import datetime as dt
import yfinance as yf
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
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
        df1 = pd.read_csv('C:/Users/Dell/OneDrive/Desktop/DST project/src/Yahoo-Finance-Ticker-Symbols.csv')
        df1_new = df1[df1['Ticker'] == params]
        if df1_new.empty:
            return render_template('index.html',error = "Enter a valid ticker!!")
        start = dt.datetime(2010,1,1)
        end = dt.date.today()

        df = yf.download(params,start,end)
        df = df.reset_index()
        open, high, low, close, adj_close, volume = df['Open'].iloc[-1], df['High'].iloc[-1], df['Low'].iloc[-1], df['Close'].iloc[-1], df['Adj Close'].iloc[-1], df['Volume'].iloc[-1]

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
        y_predicted = scaler.inverse_transform(y_predicted)
        y_test = y_test.reshape(-1,1)
        y_test = scaler.inverse_transform(y_test)
        year = dt.date.today().year
        d = dt.datetime(year-4,1,2)
        df2 = df[df['Date'] == d]
        ind = df2.index[0]
        plt.clf()
        plt.figure()
        plt.plot(df['Close'][ind:int(len(df))])
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.legend()
        plt.savefig('C:/Users/Dell/OneDrive/Desktop/DST project/src/static/images/new_plot1.png')
        
        plt.figure()
        plt.plot(y_test, 'b', label = 'Original Price')
        plt.plot(y_predicted, 'r', label = 'Predicted Price')
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.legend()
        plt.savefig('C:/Users/Dell/OneDrive/Desktop/DST project/src/static/images/new_plot.png')
        return render_template("result.html", url1 ='/static/images/new_plot.png', url2 ='/static/images/new_plot1.png', open = open, high = high, low = low, close = close, adj_close=adj_close, volume=volume)
app.run(host='0.0.0.0') 