import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/context";
import Button from "../tinycomp/Button";
import Input from "../tinycomp/Input";

export default function Username() {
  const { currentUser } = useUser();
  const [selected, setSelected] = useState("058");
  const [accNum, setAccNum] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loadTransfer, setLoadTransfer] = useState(false);

  const navigate = useNavigate();

  // fetch accont name  api call
  const handleChange = (e: any) => {
    setAccNum(e.target.value);
  };

  const addComma = (num: any) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const removeNonNumber = (num: any) => num.toString().replace(/[^0-9]/g, "");

  const handleAmount = (e: any) => {
    setTransferAmount(addComma(removeNonNumber(e.target.value)));
  };

  //   const isValid = selected && accName && transferAmount && narration;

  // handlesubmit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // currentUser?.transaction.push(Number(transferAmount));
    // setLoadTransfer(true);
    // setTimeout(() => {
    //   navigate("/success");
    // }, 5000);
  };
  return (
    <form className="space-y-[1em]" onSubmit={handleSubmit}>
      {/* enter account number and feedback */}
      <div>
        <Input
          type="text"
          placeholder="Beneficiary Username"
          value={accNum}
          onChange={handleChange}
        />
        {/* <div className="text-right w-[95%] mx-auto">
          {isLoading && !accName && <div>...</div>}
          {isError && (
            <div className="text-[#ee585e] text-sm font-medium ">
              Account name check failed
            </div>
          )}
          {accName && !isLoading && (
            <p className="text-slate-800 text-sm font-medium ">
              {accName?.data.account_name}
            </p>
          )}
        </div> */}
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
