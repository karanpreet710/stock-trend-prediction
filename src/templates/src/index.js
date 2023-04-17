import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Predict from "./components/Predict";
import Knowledge from "./components/Knowledge";
import Body from "./components/Body";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
        path: "/",
        element: <Body/>,
    },
    {
        path: "/predict",
        element: <Predict/>,
    },
    {  
        path: "/knowledge",
        element: <Knowledge/>,
    }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
//   <React.StrictMode>
    <RouterProvider router={appRouter} />
//   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
