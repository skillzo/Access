import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./Pages/Error.js";
import "./index.css";
import Login from "./Pages/Login";
import { IconContext } from "react-icons/lib";
import Transfer from "./Pages/Transfer";
import Transactions from "./Pages/Transactions";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./store/context";
import OnSucess from "./Pages/OnSucess";
import NotFoundPage from "./Pages/404";
import Settings from "./Pages/Settings";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SignUp from "./Pages/SignUp";
// initailize react router v6.8.2

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<App />} errorElement={<Error />}>
          <Route index element={<Transfer />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/success" element={<OnSucess />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ size: "25px" }}>
        <ContextProvider>
          <>
            <div className="hidden md:flex h-screen w-full justify-center items-center text-[#ee585e] ">
              This is a mobile app, Please switch to a Phone
            </div>
            <div className="md:hidden">
              <RouterProvider router={router} />
            </div>
          </>
        </ContextProvider>
      </IconContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
