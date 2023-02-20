import { useState } from "react";

const Section = ({ title, description, isVisible, setIsVisible }) => {
    return (
      <div className="p-2 m-2 w-1/2 border border-gray-300 rounded-lg">
        <h3 className="font-bold text-xl">{title}</h3>
        {isVisible ? (
          <>
            <button
              className="cursor-pointer no-underline"
              onClick={() => setIsVisible(false)}
            >
              Hide
            </button>
            <p>{description}</p>
          </>
        ) : (
          <button
            className="cursor-pointer no-underline"
            onClick={() => setIsVisible(true)}
          >
            Show
          </button>
        )}
      </div>
    );
  };

const Knowledge = () => {
    const [visibleSection, setIsVisibleSection] = useState("");
    return (
      <div className="flex flex-col justify-center items-center bg-gray-700 text-white h-[90vh]">
        <h1 className="text-3xl p-2 m-2 font-bold">Stock Market Basics - FAQs</h1>
        <Section
          title={"What is the difference between stocks and shares?"}
          description={
            "Stocks and shares are used interchangeably to refer to financial equities, specifically, securities that denote ownership in a public company. In simple terms, a share is a small part of a company’s stock. It is often used to describe a part of ownership of one or more companies. Stock on the other hand, refers to the ownership of a particular company. "
          }
          isVisible={visibleSection === "difference"}
          setIsVisible={(flag) =>
            flag ? setIsVisibleSection("difference") : setIsVisibleSection("")
          }
        />
        <Section
          title={
            "What is dividend in stock market?"
          }
          description={
            "Dividend in a stock market refers to cash or reward that a company provides to its shareholders. It can be issued in various forms, such as cash payment, stocks or any other form. "
          }
          isVisible={visibleSection === "dividend"}
          setIsVisible={(flag) =>
            flag ? setIsVisibleSection("dividend") : setIsVisibleSection("")
          }
        />
        <Section
          title={"What is stock market trading?"}
          description={
            "Stock market trading is the process of buying or selling of shares in a company.  Stock trading takes place in the stock market. There are 5 types of stock market trading :- Day trading, Scalping, Swing trading, Momentum trading, Position trading"
          }
          isVisible={visibleSection === "trading"}
          setIsVisible={(flag) =>
            flag ? setIsVisibleSection("trading") : setIsVisibleSection("")
          }
        />
        <Section
          title={"What is index in stock market?"}
          description={
            "Index in stock market is a statistical source that measures financial market fluctuations. They are performance indicators that indicate the performance of a certain market segment or the market as a whole."
          }
          isVisible={visibleSection === "index"}
          setIsVisible={(flag) =>
            flag ? setIsVisibleSection("index") : setIsVisibleSection("")
          }
        />
        <Section
          title={"What is bear and bull market?"}
          description={
            "Bear markets refers to a fall in stock prices and economy. Whereas, in bull market, the companies tend to generate more revenue and hence, the stock prices go up."
          }
          isVisible={visibleSection === "bearBull"}
          setIsVisible={(flag) =>
            flag ? setIsVisibleSection("bearBull") : setIsVisibleSection("")
          }
        />
        <Section
          title={"What is NIFTY and Sensex?"}
          description={
            "NIFTY and Sensex are the benchmark indexes used by NSE and BSE respectively to determine the overall performance of stock market. Sensex is a collection of the top 30 stocks listed on BSE and NIFTY is a collection of the top 50 companies listed on NSE."
          }
          isVisible={visibleSection === "niftySensex"}
          setIsVisible={(flag) =>
            flag ? setIsVisibleSection("niftySensex") : setIsVisibleSection("")
          }
        />
      </div>
    );
}

export default Knowledge;

