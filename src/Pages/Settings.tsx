import React from "react";
import { FiLogOut } from "react-icons/fi";

export default function Settings() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full">
        <div className="flex justify-between items-center w-[80%] mx-auto border border-black">
          <p>Logout</p>
          <div>
            <FiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
}
