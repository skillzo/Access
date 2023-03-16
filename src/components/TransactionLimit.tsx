import React from "react";
import { useUser } from "../store/context";
import { formatNumber } from "../utils/formatNumber";
interface types {
  tracker: string;
  amount: string;
}

export default function TransactionLimit() {
  const { currentUser } = useUser();
  const amountUsed = currentUser?.transfer_24hrs;
  const amountLeft = 3000000 - amountUsed;
  const percentageUsed = `${Math.floor((amountUsed / 3000000) * 100)}%`;
  return (
    <div className="text-xs text-slate-600 font-medium space-y-[0.5em]">
      <p>Daily Transaction Limit: &#8358; 3,000,0000</p>
      <div className="bg-[#dcdee3] ">
        <div
          style={{ width: percentageUsed }}
          className="bg-p-blue p-[0.5em] rounded-r-full"
        ></div>
      </div>

      <div className="flex justify-between items-center">
        <Tracker tracker="used" amount={formatNumber(amountUsed)} />
        <Tracker tracker="remaining" amount={formatNumber(amountLeft)} />
      </div>
    </div>
  );
}

const Tracker = ({ tracker, amount }: types) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-[10px] h-[10px] bg-[#172f80] rounded-sm"></div>
      <p>
        <span className="text-p-blue font-semibold">&#8358;{amount}</span>
        &nbsp;{tracker}
      </p>
    </div>
  );
};
