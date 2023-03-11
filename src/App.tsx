import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/navigations/Footer";

function App() {
  const [showBalance, setShowBalance] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      {/* not responsive feedback */}
      <div className="hidden lg:flex h-screen w-full justify-center items-center text-[#ee585e] ">
        This is a mobile app, Please switch to a Phone or a tablet
      </div>
      <div className="lg:hidden">
        {/* app here */}
        <Wrapper>
          {/* Navgation */}
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

          {/* Account Dashboard */}
          <div className="bg-gradient-to-r from-[#4480e3] to-[#173f80] text-white text-xs p-[2em] rounded-lg  flex justify-between items-center">
            <div className="space-y-2">
              <div className="text-2xl font-semibold">
                {showBalance ? "skillzo" : <p>&#8358; 0.10</p>}
              </div>
              <div>
                {showBalance ? "PREMIER SAVINGS" : "PREMIER SAVINGS: SKILLZO"}
              </div>
              <div>Account Status: REGULAR</div>
            </div>

            <div onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          {/* transaction limit */}
          <div className="text-xs text-slate-600 font-medium space-y-[0.5em]">
            <p>Daily Transaction Limit: &#8358; 3,000,0000</p>
            <div className="bg-[#dcdee3] ">
              <div className="w-[20%] bg-[#173f80] p-[0.5em] rounded-r-full"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <div className="w-[10px] h-[10px] bg-[#172f80] rounded-sm"></div>
                <p>
                  <span className="text-[#173f80] font-semibold">
                    &#8358;0.00
                  </span>
                  used
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-[10px] h-[10px] bg-[#172f80] rounded-sm"></div>
                <p>
                  <span className="text-[#173f80] font-semibold">
                    &#8358;0.00
                  </span>
                  remaining
                </p>
              </div>
            </div>
          </div>
          <Outlet />
        </Wrapper>
        <Footer />
      </div>
    </>
  );
}

export default App;
