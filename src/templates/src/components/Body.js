import stockImg from "../stockImg.jpg"

const Body = () => {
  return (
    <div className="flex flex-col items-center">
    <div class="bg-gray-700 h-72 flex flex-col items-center justify-center w-full">
      <h1 className="text-white text-8xl">Stock Trend Prediction</h1>
    </div>
    <img src={stockImg} alt="illustration" className="w-1/2"/>
    </div>
  );
};

export default Body;
