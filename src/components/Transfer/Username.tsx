import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/context";
import Button from "../tinycomp/Button";
import Input from "../tinycomp/Input";
import { addComma } from "../../utils/AddCommas";
import { removeCommas } from "../../utils/RemoveCommas";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
import Feedbacks from "../feedbacks/Feedbacks";
import { formatNumber } from "../../utils/formatNumber";

export default function Username() {
  const { currentUser, users } = useUser();
  const [userName, setUserName] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loadTransfer, setLoadTransfer] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handleAmount = (e: any) => {
    setTransferAmount(addComma(e.target.value));
  };

  // DEFINE VARIBALES HERE
  const amountTransferredByUser = removeCommas(transferAmount);

  const beneficiary = users?.find(
    (item: any) => item.userName === userName?.toLowerCase()
  );
  const date = new Date();
  const currDate = date.toJSON();

  // this details will render on the recievers end
  const beneficiarytrxdetails: any = {
    transaction_amount: amountTransferredByUser,
    transaction_type: "USERNAME",
    transaction_date: currDate,
    sender: currentUser?.userName,
    remark: `via Access ${narration}`,
    transaction_ref: uuidv4(),
    transaction_status: "Successful",
  };

  // this details will render on the senders end
  const trxdetails: any = {
    transaction_amount: -amountTransferredByUser,
    transaction_type: "USERNAME",
    transaction_date: currDate,
    sender: currentUser?.userName,
    beneficiary: [
      {
        full_name: beneficiary?.full_name,
        account_number: beneficiary?.userName,
      },
    ],
    remark: `TRF/${narration || "null"}/FRM ${currentUser?.full_name} TO ${
      beneficiary?.full_name
    }`,
    transaction_ref: uuidv4(),
    transaction_status: "Successful",
  };

  // make transfer using username
  const handleSubmit = (e: any) => {
    e.preventDefault();
    currentUser?.transaction.push(-amountTransferredByUser);
    beneficiary?.transaction.push(amountTransferredByUser);
    currentUser?.transaction_details.push(trxdetails);
    beneficiary?.transaction_details.push(beneficiarytrxdetails);
    // initiate transfer sequence
    setLoadTransfer(true);
    setTimeout(() => {
      navigate("/success");
    }, 1000);
    if (currentUser != undefined)
      return (currentUser.transfer_24hrs += amountTransferredByUser);
  };

  // basic checks before tranfer
  const balance = currentUser?.transaction.reduce(
    (a: number, b: number): number => a + b,
    0
  );
  const userEnteredThierName =
    userName.toLowerCase().trim() === currentUser?.userName;

  const isValid =
    Boolean(beneficiary?.full_name) &&
    !userEnteredThierName &&
    Boolean(balance > amountTransferredByUser) &&
    narration;

  return (
    <>
      {/* loading state for transfer */}
      {loadTransfer && (
        <Feedbacks>
          <BeatLoader size={50} color="#173f80" />
        </Feedbacks>
      )}
      <form className="space-y-[1em]" onSubmit={handleSubmit}>
        {/* enter account number and feedback */}
        <div>
          <Input
            type="text"
            placeholder="Beneficiary Username"
            value={userName}
            onChange={handleChange}
          />

          <div className="text-right w-[95%] mx-auto">
            {userName.length > 1 && !beneficiary && (
              <p className="text-[#ee585e] text-sm font-medium ">
                Account name check failed
              </p>
            )}
            {userEnteredThierName && (
              <p className="text-[#ee585e] text-sm font-medium ">
                You cannot trasnfer to yourself
              </p>
            )}

            <p className="text-slate-800 text-sm font-medium ">
              {beneficiary?.full_name}
            </p>
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

          {amountTransferredByUser > balance && (
            <p className="text-[#ee585e] text-sm font-medium text-right ">
              Max Amount Exceeded
            </p>
          )}

          <p className="text-slate-400 text-xs">
            Maximum Amount:
            <span className="text-p-blue font-medium text-sm ml-2">
              &#8358; {formatNumber(balance)}
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

        <Button disabled={!isValid}>Proceed</Button>
      </form>
    </>
  );
}
