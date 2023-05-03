import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/tinycomp/Input";
import Wrapper from "../components/Wrapper/Wrapper";
import { useUser } from "../store/context";
import Logo from "../assets/brand/Logo";
import Toast from "../components/Toast";
import { toast } from "react-toastify";
import Button from "../components/tinycomp/Button";

export default function Login() {
  const navigate = useNavigate();
  const {
    currentUser,
    users,
    setCurrentUser,
    persistName,
    setPersistName,
    getUsers,
  } = useUser();
  const [details, setDetails] = useState({ username: "", password: "" });
  // const name = currentUser?.full_name?.split(" ")[1] || "";

  // hydrate users array from firebase
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUsers();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // set username and password
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // DEFINE CURRENT USER
  const currUser = users?.find(
    (item: any) =>
      item.userName.toLowerCase() === details.username.toLowerCase()
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (details?.username !== currUser?.userName) {
      toast.error("username is incorrect");
      return;
    }
    if (details?.password !== currUser?.password) {
      toast.error("password is incorrect");
      return;
    }
    if (details?.password === currUser?.password) {
      setPersistName(currUser?.full_name?.split(" ")[1]);
      localStorage.setItem("currUser", JSON.stringify(currUser));
      localStorage.setItem("persistname", persistName);
      setCurrentUser(currUser);
      toast.success("Hold on dashboard coming up");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    }
  };

  // basic checks before log in
  const isValid = details.password && details.username;

  return (
    <Wrapper>
      <Toast />
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
            {persistName ? "Welcome back," : "Welcome "}&#160;
            {currentUser && (
              <span className="text-black font-normal">
                {persistName ? persistName : ""}
              </span>
            )}
          </div>

          {/* login form  */}
          <form
            onSubmit={handleLogin}
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
            <Button disabled={!isValid}>SIGN IN</Button>
          </form>

          {/* sign up new user  */}
          <div className="text-center text-sm text-slate-400">
            Don't have an account? &nbsp;
            <Link to="/signup" className="font-semibold text-p-blue">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
