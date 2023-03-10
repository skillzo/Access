import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      {/* Navgation */}
      <div className="flex items-center">
        <BiArrowBack />
        <p className="text-center text-lg font-medium w-[90%]">Transfer</p>
      </div>

      {/* Account Dashboard */}
      <div className="bg-[#173f80] text-white text-xs p-[2em] rounded-lg  flex justify-between items-center">
        <div className="space-y-2">
          <div className="text-2xl font-semibold">&#8358; 0.10</div>
          <div>PREMIER SAVINGS: Skillzo </div>
          <div>Account Status: REGULAR</div>
        </div>
        <AiOutlineEyeInvisible />
      </div>

      <div className="text-xs text-slate-600 font-medium space-y-[0.5em]">
        <p>Daily Transaction Limit: #25,000,0000</p>
        <div className="bg-[#dcdee3] ">
          <div className="w-[20%] bg-[#173f80] p-[0.5em] rounded-r-full"></div>
        </div>

        {/* transaction limit */}
        <div>
          <div className="flex items-center space-x-1">
            <div className="w-[10px] h-[10px] bg-[#172f80] rounded-sm"></div>
            <p>
              <span className="text-[#173f80] font-semibold">&#8358;0.00</span>{" "}
              used
            </p>
          </div>
        </div>
      </div>

      {/*  */}
      <Outlet />
    </Wrapper>
  );
}

export default App;
