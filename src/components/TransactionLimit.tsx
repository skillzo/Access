import React from "react";

interface types {
  tracker: string;
  amount: number;
}

export default function TransactionLimit() {
  return (
    <div className="text-xs text-slate-600 font-medium space-y-[0.5em]">
      <p>Daily Transaction Limit: &#8358; 3,000,0000</p>
      <div className="bg-[#dcdee3] ">
        <div className="w-[0%] bg-p-blue p-[0.5em] rounded-r-full"></div>
      </div>

      <div className="flex justify-between items-center">
        <Tracker tracker="used" amount={0.0} />
        <Tracker tracker="remaining" amount={3000000} />
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
