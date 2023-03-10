import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Pages/Error.jsx";
import "./index.css";
import Login from "./Pages/Login";
import { IconContext } from "react-icons/lib";
import Transfer from "./Pages/Transfer";

// initailize react router v6.8.2

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Transfer />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IconContext.Provider value={{ size: "25px" }}>
      <RouterProvider router={router} />
    </IconContext.Provider>
  </React.StrictMode>
);
