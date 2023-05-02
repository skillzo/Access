import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from "../store/context";
import TransactionLimit from "./TransactionLimit";
import { formatNumber } from "../utils/formatNumber";
import { useEffect } from "react";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(false);
  const { currentUser, persistName } = useUser();

  // save current user in localstorage
  useEffect(() => {
    localStorage.setItem("currUser", JSON.stringify(currentUser));
    localStorage.setItem("persistname", persistName);
  }, [currentUser]);

  return (
    <>
      <div className="bg-gradient-to-r from-[#4480e3] to-p-blue text-white text-xs p-[2em] rounded-lg  flex justify-between items-center">
        <div className="space-y-2">
          <div className="text-2xl font-semibold">
            {showBalance ? (
              currentUser?.userName
            ) : (
              <p>&#8358; {formatNumber(currentUser?.balance) || 0}</p>
            )}
          </div>
          <div>
            PREMIER SAVINGS
            <span>{!showBalance && `: ${currentUser?.userName}`}</span>
          </div>
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
