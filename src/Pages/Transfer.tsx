import React from "react";
import RecentTransfer from "../components/RecentTransfer";
import Button from "../components/tinycomp/Button";
import Input from "../components/tinycomp/Input";

export default function Transfer() {
  return (
    <>
      {/* frequent transfers */}
      <div className="space-y-2">
        <p className="text-slate-600 font-medium text-sm">Recent Transfers</p>
        <div className="flex space-x-4">
          <RecentTransfer />
        </div>
      </div>
      <div className="space-y-[1em]">
        <Input type="text" placeholder="Bank" />
        <div>
          <Input type="text" placeholder="Beneficiary Account Number" />
          <p className="text-slate-800 text-sm font-medium ml-2">
            Chukwu Emmanuel Oluwatobi
          </p>
        </div>
        <div>
          <Input type="text" placeholder="&#8358; Amount" />
          <p className="text-slate-400 text-xs ">
            Maximum Amount:
            <span className="text-[#173f80] font-medium text-sm">
              #3,000,000
            </span>
          </p>
        </div>
        <Input type="text" placeholder="Narration" />
        <Button disabled>Proceed</Button>
      </div>
    </>
  );
}
