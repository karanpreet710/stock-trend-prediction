
import { useState } from "react";
import Insights from "./Insights";

const Predict = () => {

  const [val, setVal] = useState(null);
  const [flag, setFlag] = useState(false);

  return (
    <>
    <div className="flex flex-col items-center justify-center w-full">
      <div className="border border-gray-200 p-8 m-4 rounded-md shadow-lg">
        <h2 className="text-4xl font-bold p-8">Pls Enter A Stock Symbol</h2>
        <div className="flex items-center justify-start px-8">
          <input id="stock" className="bg-white border border-gray-400 text-black rounded-l-full rounded-r-full px-2 h-10 mr-2" placeholder="Company Stock Symbol" />
          <button onClick={() => {
            setVal(document.getElementById('stock').value);
            setFlag(true);
            console.log(val);
          }} className="bg-green-100 rounded-l-full rounded-r-full p-2 m-2 w-28 text-xl">
            Predict
          </button>
        </div>
      </div>
    </div>
    { flag && <Insights stockName = {val}/>  }  
    </>
  );
};

export default Predict;
