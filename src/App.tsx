import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/navigations/Footer";
import Dashboard from "./components/Dashboard";
function App() {
  const location = useLocation();

  return (
    <>
      {/* not responsive feedback */}
      <div className="hidden lg:flex h-screen w-full justify-center items-center text-[#ee585e] ">
        This is a mobile app, Please switch to a Phone or a tablet
      </div>
      <div className="lg:hidden">
        <Wrapper>
          <div className="flex items-center">
            <BiArrowBack />
            <p className="text-center text-lg font-medium w-[90%]">
              {location?.pathname === "/"
                ? "Transfer"
                : location.pathname
                    .slice(1, location.pathname.length)
                    .charAt(0)
                    .toUpperCase() +
                  location.pathname.slice(2, location.pathname.length)}
            </p>
          </div>
          <Dashboard />
          <Outlet />
        </Wrapper>
        <Footer />
      </div>
    </>
  );
}

export default App;
