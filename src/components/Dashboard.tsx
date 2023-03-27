import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from "../store/context";
import TransactionLimit from "./TransactionLimit";
import { formatNumber } from "../utils/formatNumber";
import { useEffect } from "react";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(false);
  const { currentUser, setIsAuth, isAuth } = useUser();
  const balance = formatNumber(
    currentUser?.transaction.reduce((a: any, b: any) => a + b, 0)
  );

  // save current user in localstorage
  useEffect(() => {
    setIsAuth(true);
    localStorage.setItem("currUser", JSON.stringify(currentUser));
    localStorage.setItem("isAuth", isAuth);
  }, [currentUser]);
  return (
    <>
      <div className="bg-gradient-to-r from-[#4480e3] to-p-blue text-white text-xs p-[2em] rounded-lg  flex justify-between items-center">
        <div className="space-y-2">
          <div className="text-2xl font-semibold">
            {showBalance ? (
              currentUser?.userName
            ) : (
              <p>&#8358; {balance || 0}</p>
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
