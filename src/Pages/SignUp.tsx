import React, { useState } from "react";
import Wrapper from "../components/Wrapper/Wrapper";
import Logo from "../assets/brand/Logo";
import Input from "../components/tinycomp/Input";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../store/context";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../store/Firebase/Firebase";
import Toast from "../components/Toast";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLater";

export default function SignUp() {
  const navigate = useNavigate();
  const { setCurrentUser, users } = useUser();
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const user_id = `${details.username?.trim()}id`;
  const usersCollection = doc(db, "users", user_id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userSchema = {
      id: uuidv4(),
      full_name:
        capitalizeFirstLetter(details.first_name) +
        " " +
        capitalizeFirstLetter(details.last_name),
      userName: details.username?.trim(),
      password: details.password,
      balance: 3000000,
      transfer_24hrs: 0,
      recent_transaction: [],
      transaction_details: [],
    };
    if (
      users?.find(
        (user: any) => user?.userName?.toLowerCase() === details.username
      )
    ) {
      toast.error("username is already taken");
      return;
    }
    await setDoc(usersCollection, userSchema);
    localStorage.setItem("currUser", JSON.stringify(userSchema));
    setCurrentUser(userSchema);
    toast.success("Welcome to our bank");
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  };

  const addskillzo = async () => {
    await setDoc(doc(db, "users", "skillzoid"), {
      id: "T1XwocBvjQHmbRuziPpc",
      full_name: "Chukwu Emmanuel Oluwatobi",
      userName: "skillzo",
      password: "skillzo",
      balance: 3000000,
      transfer_24hrs: 2000000,
      recent_transaction: [
        {
          id: uuidv4(),
          bankCode: "058",
          account_number: "0243563736",
          full_name: "Chukwu Emmanuel Oluwatobi",
        },
        {
          id: uuidv4(),
          bankCode: "50211",
          account_number: "2023812295",
          full_name: "Uzoechina Jacinta ijeoma ",
        },
      ],
      transaction_details: [
        {
          beneficiary: [
            {
              bank_name: "access bank",
              full_name: "Jacinta Uzoechina Ijeoma",
              account_number: "0098220998",
            },
          ],
          sender: "skillo",
          transaction_date: "2023-03-27T00:56:50.528Z",
          remark:
            "TRF/null/FRM EMMANURL OLUWATOBI CHUKWU TO DAMILOLA FUNMILOLA OLAYIWOLA",
          transaction_ref: "NX0001000100010101",
          transaction_amount: 1000000,
          transaction_status: "Successful",
          transaction_type: "username",
        },
      ],
    });
  };

  return (
    <Wrapper>
      <button onClick={() => addskillzo()}>click me</button>
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

      <div className="h-[80vh] flex justify-center items-center">
        <div className=" w-[80%] mx-auto space-y-[2em]">
          <div className="text-slate-400 font-semibold text-center ">
            FREE MONEY FOR EVERYONE
          </div>

          <form onSubmit={signUp} className="space-y-[1.5em] bg-access-blue">
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
            </div>

            <button className="bg-p-orange text-white text-sm font-semibold py-[1em] w-full">
              SIGN UP
            </button>
          </form>

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
