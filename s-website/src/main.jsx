import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="flex w-full min-h-screen justify-center ">
    <div className="w-96 h-full">
    <RouterProvider router={router} />
    </div>
  </div>
);
