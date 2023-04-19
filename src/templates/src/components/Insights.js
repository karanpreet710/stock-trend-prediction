import { useState, useEffect } from "react";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";

const Insights = ({stockName, modelName}) => {
  const d = new Date();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  console.log(stockName)
  const [data, setData] = useState(null);
  // const [errorPresent, setErrorPresent] = useState(false);
  useEffect(() => {
    setData(null);
    getInsightsData();
  }, [stockName, modelName]);

  async function getInsightsData() {
    const data = await fetch(`http://localhost:5000/predict?Name=${stockName}&Model=${modelName}`);
    const json = await data.json();
    setData(json);
    console.log(json);
    // if(data.error) setErrorPresent(true);
  }

  // if(!data)return;
  // if(data.error) 

  return !data ? <Loader /> : data.error ? <ErrorPage /> : (
    <div className="grid grid-cols-6 w-4/5 gap-2 rounded-lg mb-3" style={{width:"1000px", margin:"2px auto"}}>
    <h1 className="col-span-6 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg  h-14 text-3xl font-medium py-2">
      Today's {data.name} Stock Data
    </h1>
    <div className="bg-[#F5E9CF] text-[#E96479] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.open + "e+2") + "e-2")}</h2>
      <h3>OPEN</h3>
    </div>
    <div className="bg-[#F5E9CF] text-[#E96479] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.close + "e+2") + "e-2")}</h2>
      <h3>CLOSE</h3>
    </div>
    <div className=" bg-[#F5E9CF] text-[#E96479] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.high + "e+2") + "e-2")}</h2>
      <h3>HIGH</h3>
    </div>
    <div className=" bg-[#F5E9CF] text-[#E96479] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.low + "e+2") + "e-2")}</h2>
      <h3>LOW</h3>
    </div>
    <div className=" bg-[#F5E9CF] text-[#E96479] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.adj_close + "e+2") + "e-2")}</h2>
      <h3>ADJ CLOSE</h3>
    </div>
    <div className=" bg-[#F5E9CF] text-[#E96479] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.volume + "e+2") + "e-2")}</h2>
      <h3>VOLUME</h3>
    </div>
    <img
      src={data.url1}
      alt="Chart1"
      className="col-span-3 rounded-lg "
    />
    <img
      src={data.url2}
      alt="Chart2"
      className="col-span-3 rounded-lg "
    />
    <img
      src={data.url3}
      alt="Chart3"
      className="col-span-3 rounded-lg "
    />
    <img
      src={data.url4}
      alt="Chart4"
      className="col-span-3 rounded-lg "
    />
    <div className="col-span-3 text-[#E96479] bg-[#F5E9CF] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.forecast[0][0] + "e+2") + "e-2")}</h2>
      <h3>TOMORROW'S {data.name} CLOSING PRICE BY {modelName}</h3>
    </div>
    <div className="col-span-3  text-[#E96479] bg-[#F5E9CF] rounded-lg  text-center h-14 text-xl font-medium">
      <h2>{+(Math.round(data.rmse + "e+2") + "e-2")}</h2>
      <h3>{modelName} RMSE</h3>
    </div>
    <h1 className="col-span-6 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      Predicted {data.name} Price For The Next 7 Days
    </h1>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {weekday[(d.getDay()+1)%7]}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {d.setDate(d.getDate() + 1) && d.toLocaleDateString()}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
    {+(Math.round(data.forecast[0][0] + "e+2")  + "e-2")}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {weekday[(d.getDay()+1)%7]}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {d.setDate(d.getDate() + 1) && d.toLocaleDateString()}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
    {+(Math.round(data.forecast[1][0] + "e+2")  + "e-2")}
    </h2>
    {/* <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      inc
    </h2> */}
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {weekday[(d.getDay()+1)%7]}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {d.setDate(d.getDate() + 1) && d.toLocaleDateString()}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
    {+(Math.round(data.forecast[2][0] + "e+2")  + "e-2")}
    </h2>
    {/* <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      inc
    </h2> */}
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {weekday[(d.getDay()+1)%7]}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {d.setDate(d.getDate() + 1) && d.toLocaleDateString()}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
    {+(Math.round(data.forecast[3][0] + "e+2")  + "e-2")}
    </h2>
    {/* <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      inc
    </h2> */}
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {weekday[(d.getDay()+1)%7]}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {d.setDate(d.getDate() + 1) && d.toLocaleDateString()}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
    {+(Math.round(data.forecast[4][0] + "e+2")  + "e-2")}
    </h2>
    {/* <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      inc
    </h2> */}
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {weekday[(d.getDay()+1)%7]}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {d.setDate(d.getDate() + 1) && d.toLocaleDateString()}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
    {+(Math.round(data.forecast[5][0] + "e+2")  + "e-2")}
    </h2>
    {/* <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      inc
    </h2> */}
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {weekday[(d.getDay()+1)%7]}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      {d.setDate(d.getDate() + 1) && d.toLocaleDateString()}
    </h2>
    <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
    {+(Math.round(data.forecast[6][0] + "e+2")  + "e-2")}
    </h2>
    {/* <h2 className="col-span-2 text-center bg-[#F5E9CF] text-[#E96479] rounded-lg h-14 text-3xl font-medium py-2">
      inc
    </h2> */}
  </div>
  );
};

export default Insights;


// const [stock, setStock] = useState(null);
// const handleSubmit = (e) => {
//   e.preventDefault();
//   const obj = {stock};
//   console.log(obj);

//   fetch(`http://localhost:5000/predict?Name=${stock}`, {
//     method: "GET"
//   }).then(() => {
//     console.log("done!");
//   }).catch((err) => {
//     console.log(err.message); 
//   });
// }