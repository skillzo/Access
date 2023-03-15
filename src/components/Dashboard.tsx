import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TransactionLimit from "./TransactionLimit";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(false);
  return (
    <>
      <div className="bg-gradient-to-r from-[#4480e3] to-p-blue text-white text-xs p-[2em] rounded-lg  flex justify-between items-center">
        <div className="space-y-2">
          <div className="text-2xl font-semibold">
            {showBalance ? "skillzo" : <p>&#8358; 0.10</p>}
          </div>
          <p>
            PREMIER SAVINGS
            {!showBalance && ": SKILLZO"}
          </p>
          <div>Account Status: REGULAR</div>
        </div>

        <div onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      </div>

      <TransactionLimit />
    </>
  );
}
