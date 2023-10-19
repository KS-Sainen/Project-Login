import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./HomePage.jsx"
import "./index.css"
import SignIn from "./SignInPage.jsx"
import ClassChoice from "./OptionPage.jsx"
import SignUp from "./SignUpPage.jsx"
import ClassHome from "./ClassPage.jsx"

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
    path: "/classoption",
    element: <ClassChoice />,
  },
  {
    path: "/class/:key",
    element: <ClassHome />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="w-full min-h-screen min-w-max bg-[#242528]">
    <RouterProvider router={router} />
  </div>
)
