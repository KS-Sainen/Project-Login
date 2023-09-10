import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import SignIn from "./SignInPage.jsx"
import Home from "./HomePage.jsx"
import SignUp from "./SignUpPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="w-full min-h-screen bg-[#242528]">
    <RouterProvider router={router} />
  </div>
)
