import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile";
import PropertyCard from "./components/PropertyCard";
import Home from "./components/Home";
import PropertyDetails from "./components/PropertyDetails";
import store from "./utils/store";
import { Provider } from "react-redux";
import AddProperty from "./components/AddProperty";
import NFT_Helper from "./utils/NFT_APIs";
import Escrow_Helper from "./utils/Escrow_APIs";
import Requests from "./components/Requests";
import Dashboard from "./components/Dashboard";
import PropertyOwnership from "./components/PropertyOwnership";
import Check from "./components/Check";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "nft_helper",
        element: <NFT_Helper />,
      },
      {
        path: "escrow_helper",
        element: <Escrow_Helper />,
      },
      {
        path: "property/ownership/:id",
        element: <PropertyOwnership />,
      },
      {
        path: "check",
        element: <Check />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "property/:id",
        element: <PropertyDetails />,
      },
      {
        path: "add-property",
        element: <AddProperty />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
