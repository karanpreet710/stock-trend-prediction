const Loader = () => {
    return (
      <div className="flex flex-wrap mt-10 mx-5 justify-center">
        {Array(10)
          .fill("")
          .map((e, index) => (
            <div key={index} className="w-[325px] h-80 p-[5px] pb-[10px]">
              <div className="card animate-pulse">
                <div className="h-48 bg-gray-300 bg-gradient-to-r from-gray-300 to-gray-200 rounded-t-md mx-[5px]"></div>
                <div className="h-[92px]">
                  <h2 className="h-7 bg-gray-300 bg-gradient-to-r from-gray-300 to-gray-200 rounded-md my-[5px] mx-[5px]"></h2>
                  <p className="h-16 bg-gray-300 bg-gradient-to-r from-gray-300 to-gray-200 rounded-md mx-[5px]"></p>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  export default Loader;