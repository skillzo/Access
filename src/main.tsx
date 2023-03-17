import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Pages/Error.jsx";
import "./index.css";
import Login from "./Pages/Login";
import { IconContext } from "react-icons/lib";
import Transfer from "./Pages/Transfer";
import Transactions from "./Pages/Transactions";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./store/context";
import OnSucess from "./Pages/OnSucess";
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
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "success",
    element: <OnSucess />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ size: "25px" }}>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </IconContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
