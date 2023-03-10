import React from "react";
import Button from "../components/tinycomp/Button";
import Input from "../components/tinycomp/Input";

export default function Transfer() {
  return (
    <>
      <div className="space-y-[1em]">
        <Input type="text" placeholder="Bank" />
        <div>
          <Input type="text" placeholder="Beneficiary Account Number" />
          <p className="text-slate-800 text-sm font-medium">
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
