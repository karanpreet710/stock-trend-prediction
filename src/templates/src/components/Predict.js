
import { useState } from "react";
import Insights from "./Insights";

const Predict = () => {

  const [stock, setStock] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {stock};
    // console.log(obj);

    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify(obj),
    }).then(() => {
      console.log("done!");
    }).catch((err) => {
      console.log(err.message); 
    });
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center w-full">
      <div className="border border-gray-200 p-8 m-4 rounded-md shadow-lg">
        <h2 className="text-4xl font-bold p-8">Pls Enter A Stock Symbol</h2>
        <form action="" onSubmit={handleSubmit}>
        <div className="flex items-center justify-start px-8">
          <input className="bg-white border border-gray-400 text-black rounded-l-full rounded-r-full px-2 h-10 mr-2" placeholder="Company Stock Symbol" value={stock} onChange={e => setStock(e.target.value)} />
          <button type="submit" className="bg-green-100 rounded-l-full rounded-r-full p-2 m-2 w-28 text-xl">
            Predict
          </button>
        </div>
        </form>
      </div>
      <Insights />
    </div>
    
    </>
  );
};

export default Predict;
