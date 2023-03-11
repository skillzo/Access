import React from "react";
import Info from "../components/Transactions/Info";

export default function Transactions() {
  return (
    <div className="space-y-4">
      <p className="text-slate-600 text-sm font-medium">
        11 Mar 2023, SATURDAY
      </p>
      <div className="border bg-white w-full  space-y-2">
        <Info />
        <Info moneyOut />
        <Info />
      </div>
    </div>
  );
}
