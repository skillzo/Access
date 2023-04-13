import React from "react";
import { FiLogOut } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";
import { useUser } from "../store/context";

export default function Settings() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth, setIsAuth } = useUser();
  console.log("settings", isAuth);

  return (
    <Wrapper>
      <div className="flex items-center">
        <BiArrowBack onClick={() => navigate(-1)} />
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
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full">
          <div className="flex justify-between items-center w-[80%] mx-auto">
            <p>Logout</p>
            <div
              onClick={() => {
                console.log("log out ");
                setIsAuth(false);
              }}
            >
              <FiLogOut />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
