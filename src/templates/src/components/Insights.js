import { useState, useEffect } from "react";

const Insights = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getInsightsData();
  }, []);

  async function getInsightsData() {
    const data = await fetch("/predict");
    const json = await data.json();
    setData(json);
  }

  if (!data) return;
  return (
    <div className="flex items-center justify-center flex-col w-full border border-gray-200">
      <h1 className="p-3">Today's {data.name} Stock Data</h1>
      <div className="w-full h-12 flex items-center justify-center mt-4">
        <div className="w-24 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.open}</h2>
          <h3>OPEN</h3>
        </div>
        <div className="w-24 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.close}</h2>
          <h3>CLOSE</h3>
        </div>
        <div className="w-24 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.high}</h2>
          <h3>HIGH</h3>
        </div>
        <div className="w-24 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.low}</h2>
          <h3>LOW</h3>
        </div>
        <div className="w-24 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.adj_close}</h2>
          <h3>ADJ CLOSE</h3>
        </div>
        <div className="w-24 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.volume}</h2>
          <h3>VOLUME</h3>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <img
          src={data.url1}
          alt="Chart1"
          height="400"
          width="400"
          className="mx-3 rounded-lg"
        />
        <img
          src={data.url2}
          alt="Chart1"
          height="400"
          width="400"
          className="mx-3 rounded-lg"
        />
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <img
          src={data.url3}
          alt="Chart1"
          height="400"
          width="400"
          className="mx-3 rounded-lg"
        />
        <img
          src={data.url4}
          alt="Chart1"
          height="400"
          width="400"
          className="mx-3 rounded-lg"
        />
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-80 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.forecast[0][0]}</h2>
          <h3>TOMORROW'S {data.name} CLOSING PRICE BY ARIMA</h3>
        </div>
        <div className="w-80 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.forecast[1][0]}</h2>
          <h3>TOMORROW'S {data.name} CLOSING PRICE BY LSTM</h3>
        </div>
        <div className="w-80 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.forecast[2][0]}</h2>
          <h3>TOMORROW'S {data.name} CLOSING PRICE BY LR</h3>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4">
      <div className="w-80 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.rmse}</h2>
          <h3>ARIMA RMSE</h3>
        </div>
        <div className="w-80 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.rmse}</h2>
          <h3>LSTM RMSE</h3>
        </div>
        <div className="w-80 border border-red-300 mx-5 rounded-2xl bg-green-100 text-center">
          <h2>{data.rmse}</h2>
          <h3>LR RMSE</h3>
        </div>
      </div>
    </div>
  );
};

export default Insights;
