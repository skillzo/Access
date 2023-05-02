import React, { useState } from "react";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { TfiCreditCard } from "react-icons/tfi";
import { formatNumber } from "../../utils/formatNumber";
import Receipt from "./Receipt";

interface props {
  moneyOut?: boolean;
  amount: any;
  remarks: string;
  item: any;
}

export default function Info({ amount, remarks, item }: props) {
  const [showReciept, setShowReciept] = useState(false);

  if (amount < 0)
    return (
      <>
        {showReciept && <Receipt item={item} setShowReciept={setShowReciept} />}
        <div
          onClick={() => setShowReciept(!showReciept)}
          className="flex justify-between items-center p-4 border-b"
        >
          <div className="bg-[#e0e5ee] p-3 ">
            <MdOutlineConnectWithoutContact color="#173f80" />
          </div>
          <div className="w-[55%] text-xs text-left ">{remarks}</div>
          <div className="w-[25%] text-sm text-[#ec5b64] text-right truncate">
            &#8358; {formatNumber(Math.abs(amount)) || "0"}
          </div>
        </div>
      </>
    );

  return (
    <>
      {showReciept && <Receipt item={item} setShowReciept={setShowReciept} />}
      <div
        onClick={() => setShowReciept(true)}
        className="flex justify-between items-center p-4 border-b"
      >
        <div className="bg-[#e0e5ee] p-3 ">
          <TfiCreditCard color="#173f80" />
        </div>
        <div className="w-[55%] text-xs text-left ">via GTWORLD skilzo</div>
        <div className="w-[25%] text-sm  text-[#a5c323]  text-right truncate">
          &#8358; {formatNumber(Math.abs(amount)) || "0"}
        </div>
      </div>
    </>
  );
}
