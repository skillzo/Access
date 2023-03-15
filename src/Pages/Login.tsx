import React from "react";
import { ReactComponent as Logo } from "../assets/brand/logo.svg";
import Input from "../components/tinycomp/Input";
import Wrapper from "../components/Wrapper/Wrapper";

export default function Login() {
  return (
    <Wrapper>
      <div className="flex justify-between items-center">
        <div className="w-[150px]">
          <Logo />
        </div>
        <img
          className="w-[50px] h-[35px] object-cover"
          src="https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg"
          alt=""
        />
      </div>

      {/* existing user  */}
      <div className="h-[80vh] flex justify-center items-center">
        <div className=" w-[80%] mx-auto space-y-[2em]">
          <div className="text-slate-400 font-semibold text-center ">
            Welcome back,
            <span className="text-black font-normal"> Emmanuel</span>
          </div>

          <div className="space-y-[1.5em] bg-access-blue">
            <div className="space-y-[1em]">
              <Input type="text" placeholder="username" />
              <Input type="password" placeholder="password" />
            </div>
            <div className="text-p-blue font-medium text-right">
              Forgot Password?
            </div>
            <button className="bg-[#fe8101] text-white text-sm font-semibold py-[1em] w-full">
              SIGN IN
            </button>
          </div>
          <div className="text-center text-sm text-slate-400">
            Don't have an account?
            <span className="font-semibold text-p-blue">Sign Up</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
