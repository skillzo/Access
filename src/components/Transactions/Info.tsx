import React from "react";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { TfiCreditCard } from "react-icons/tfi";

interface props {
  moneyOut?: boolean;
}

export default function Info({ moneyOut }: props) {
  if (moneyOut)
    return (
      <div className="flex justify-between items-center p-4 border-b">
        <div className="bg-[#e0e5ee] p-3 ">
          <MdOutlineConnectWithoutContact color="#173f80" />
        </div>
        <div className="w-[55%] text-xs text-left ">
          TRF chris FRM CHUKWU EMMANUEL OLUWATOBI TO EMMANUEL OLUWATOBI CHUKWU
        </div>
        <div className="w-[25%] text-sm text-[#ec5b64] text-right truncate">
          &#8358; 1,000,000
        </div>
      </div>
    );

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="bg-[#e0e5ee] p-3 ">
        <TfiCreditCard color="#173f80" />
      </div>
      <div className="w-[55%] text-xs text-left ">via GTWORLD skilzo</div>
      <div className="w-[25%] text-sm  text-[#a5c323]  text-right truncate">
        &#8358; 1,000,000
      </div>
    </div>
  );
}
