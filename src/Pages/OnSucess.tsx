import React from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import Button from "../components/tinycomp/Button";
import CTA from "../components/onsucess/CTA";
import { useNavigate } from "react-router-dom";

export default function OnSucess() {
  const navigate = useNavigate();
  return (
    <div className="fixed h-screen w-full bg-white p-3 pt-[5em] text-center  ">
      <img
        src="https://i.gifer.com/7efs.gif"
        alt="feedback"
        className="mx-auto "
      />
      <div className="space-y-4">
        <h2 className="font-bold text-2xl text-slate-800">Success</h2>
        <p className="text-slate-500">Transfer Sucessful</p>
      </div>

      <div className="absolute w-[95%] mx-auto   p-3 bottom-0 space-y-[2em]">
        <div className="flex justify-between items-center">
          <CTA text="Save Beneficiary" comp={<MdOutlinePersonAddAlt />} />
          <CTA text="Share Receipt" comp={<FiShare />} />
        </div>
        <Button onClick={() => navigate("/")}>Close</Button>
      </div>
    </div>
  );
}
