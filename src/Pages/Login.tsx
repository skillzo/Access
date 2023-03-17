import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/brand/logo.svg";
import Input from "../components/tinycomp/Input";
import Wrapper from "../components/Wrapper/Wrapper";
import { useUser } from "../store/context";

export default function Login() {
  const { currentUser, users, setCurrentUser, setIsAuth } = useUser();
  const [details, setDetails] = useState({ username: "", password: "" });
  // const name = currentUser?.full_name.split(" ")[1] || "skillzo";

  const navigate = useNavigate();

  // set username and password
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // login user
  const currUser = users.find(
    (item: any) => item.userName === details.username.toLowerCase()
  );

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (details?.password === currUser?.password) {
      setCurrentUser(currUser);
      setIsAuth(true);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    localStorage.setItem("currUser", JSON.stringify(currUser));
  }, [currUser]);

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
            {/* <span className="text-black font-normal">{name}</span> */}
          </div>

          {/* login form  */}
          <form
            onSubmit={handlesubmit}
            className="space-y-[1.5em] bg-access-blue"
          >
            <div className="space-y-[1em]">
              <Input
                type="text"
                placeholder="username"
                onChange={handleChange}
                name="username"
              />
              <Input
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"
              />
            </div>

            {/* forgot password */}
            <div className="text-p-blue font-medium text-right">
              Forgot Password?
            </div>
            <button className="bg-[#fe8101] text-white text-sm font-semibold py-[1em] w-full">
              SIGN IN
            </button>
          </form>

          {/* sign up new user  */}
          <div className="text-center text-sm text-slate-400">
            Don't have an account? &nbsp;
            <span className="font-semibold text-p-blue">Sign Up</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
