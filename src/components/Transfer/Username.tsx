import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/context";
import Button from "../tinycomp/Button";
import Input from "../tinycomp/Input";
import { addComma } from "../../utils/AddCommas";
import { removeCommas } from "../../utils/RemoveCommas";

export default function Username() {
  const { currentUser, users } = useUser();
  const [userName, setUserName] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loadTransfer, setLoadTransfer] = useState(false);

  const navigate = useNavigate();

  console.log(users);

  const handleChange = (e: any) => {
    setUserName(e.target.value);
  };
  const currUser = users.find(
    (item: any) => item.userName === userName?.toLowerCase()
  );

  console.log(removeCommas(transferAmount));

  const handleAmount = (e: any) => {
    setTransferAmount(addComma(e.target.value));
  };

  //   const isValid = userName && transferAmount && narration;

  const date = new Date();
  const currDate = date.toJSON();
  console.log(currDate);

  const details: any = {
    transaction_amount: 100000,
    transaction_type: "username",
    transaction_date: "username",
  };

  // make transfer
  const handleSubmit = (e: any) => {
    const transactionDetals = {};
    e.preventDefault();

    // currentUser?.transaction.push(Number(transferAmount));

    // setLoadTransfer(true);
    // setTimeout(() => {
    //   navigate("/success");
    // }, 5000);
  };
  return (
    <form className="space-y-[1em]" onSubmit={handleSubmit}>
      <div>{currDate}</div>
      {/* enter account number and feedback */}
      <div>
        <Input
          type="text"
          placeholder="Beneficiary Username"
          value={userName}
          onChange={handleChange}
        />

        <div className="text-right w-[95%] mx-auto">
          {userName.length > 1 && !currUser && (
            <p className="text-[#ee585e] text-sm font-medium ">
              Account name check failed
            </p>
          )}

          {currUser && (
            <p className="text-slate-800 text-sm font-medium ">
              {currUser?.full_name}
            </p>
          )}
        </div>
      </div>

      {/* enter amount */}
      <div>
        <Input
          type="text"
          placeholder="&#8358; Amount"
          value={transferAmount}
          onChange={handleAmount}
        />

        {/* max transfer */}
        <p className="text-slate-400 text-xs">
          Maximum Amount:
          <span className="text-p-blue font-medium text-sm ml-2">
            &#8358; 3,000,000
          </span>
        </p>
      </div>

      {/* enter trasnfer narration */}
      <Input
        type="text"
        placeholder="Narration"
        value={narration}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNarration(e.target.value)
        }
      />

      <Button>Proceed</Button>
    </form>
  );
}
