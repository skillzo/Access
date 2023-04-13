import React, { useState } from "react";
import Wrapper from "../components/Wrapper/Wrapper";
import Logo from "../assets/brand/Logo";
import Input from "../components/tinycomp/Input";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  console.log(details);
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
            FREE MONEY FOR EVERYONE
          </div>

          {/* login form  */}
          <form
            onSubmit={(e) => {
              console.log(details);
            }}
            className="space-y-[1.5em] bg-access-blue"
          >
            <div className="space-y-[1em]">
              <Input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="first_name"
              />
              <Input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="last_name"
              />
              <Input
                type="text"
                placeholder="Username"
                onChange={handleChange}
                name="username"
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                name="password2"
              />
            </div>

            <button className="bg-p-orange text-white text-sm font-semibold py-[1em] w-full">
              SIGN IN
            </button>
          </form>

          {/* sign up new user  */}
          <div className="text-center text-sm text-slate-400">
            Already have an account? &nbsp;
            <Link to="/login">
              <span className="font-semibold text-p-blue">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
