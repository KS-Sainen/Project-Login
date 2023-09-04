import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import SignIn from "./SignInPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="w-full min-h-screen bg-[#242528]">
    <RouterProvider router={router} />
  </div>
)
