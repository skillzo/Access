import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/context";
import data from "../../store/bankcode.json";
import RecentTransfer from "../RecentTransfer";
import Button from "../tinycomp/Button";
import Input from "../tinycomp/Input";
import BeatLoader from "react-spinners/BeatLoader";
import Feedbacks from "../feedbacks/Feedbacks";
import Select from "react-select";
import { addComma } from "../../utils/AddCommas";
import { removeCommas } from "../../utils/RemoveCommas";
import { formatNumber } from "../../utils/formatNumber";
import { v4 as uuidv4 } from "uuid";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../store/Firebase/Firebase";

export default function BankTransfer() {
  const date = new Date();
  const currDate = date.toJSON();
  const { currentUser, getUsers } = useUser();
  const [selected, setSelected] = useState("");
  const [accNum, setAccNum] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loadTransfer, setLoadTransfer] = useState(false);

  const navigate = useNavigate();
  const handleAmount = (e: any) => {
    setTransferAmount(addComma(e.target.value));
  };
  const amountTransferredByUser = removeCommas(transferAmount);

  // bank name dropdown options
  const options: any = [];
  data.map((item) => {
    const label = (
      <div className="flex items-center">
        <img
          src={item.logo}
          alt={item.name}
          className="w-[40px] h-[40px] rounded-sm object-contain mr-4"
        />
        {item.name}
      </div>
    );
    const value = item.code;
    options.push({
      label,
      value,
    });
  });

  //  custom bank name filter function
  const customSearch = (option: any, input: string) => {
    if (
      option.data.label.props.children[1]
        .toLowerCase()
        .includes(input.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  // get bank name from account number
  const getData: any = async () => {
    const url = `https://maylancer.org/api/nuban/api.php?account_number=${accNum.trim()}&bank_code=${selected}`;
    return axios.get(url);
  };
  const {
    data: accName,
    isLoading,
    isError,
    error,
    refetch,
  }: any = useQuery("acc-name", getData, { enabled: false });

  // fetch account name using api
  const handleChange = (e: any) => {
    setAccNum(e.target.value);
    if (accNum.length == 9 && selected) {
      setTimeout(() => {
        refetch();
      }, 500);
    }
  };

  console.log(accName);
  // ///////////////////////////////////////////////////////////////////////////////////
  // DEFINE VARIABLES HERE

  // recievers full name
  const full_name = accName?.data.account_name;
  const currRef = doc(db, "users", `${currentUser?.userName?.trim()}id`);

  // transaction reciept for the sender
  const trxdetails: any = {
    transaction_amount: -amountTransferredByUser,
    transaction_type: "INTER-BANK",
    transaction_date: currDate,
    sender: currentUser?.userName,
    beneficiary: [
      {
        full_name,
        account_number: accNum,
      },
    ],
    remark: `TRF/${narration || "null"}/FRM ${
      currentUser?.full_name
    } TO ${full_name}`,
    transaction_ref: uuidv4(),
    transaction_status: "Successful",
  };

  // initiate transfer to bank account
  const transferFunds = async (e: any) => {
    e.preventDefault();

    // update Firebase
    await updateDoc(currRef, {
      balance: increment(-amountTransferredByUser),
      transfer_24hrs: increment(-amountTransferredByUser),
      transaction_details: arrayUnion(trxdetails),
    });

    // updatelocalStorage
    currentUser?.transaction_details.push(trxdetails);
    currentUser.transfer_24hrs += amountTransferredByUser;
    currentUser.balance += -amountTransferredByUser;
    localStorage.setItem("currUser", JSON.stringify(currentUser));
    // initiate transfer sequence
    setLoadTransfer(true);
    setTimeout(() => {
      navigate("/success");
    }, 1000);
  };

  // validate transfer
  const isValid = selected && accName && transferAmount && narration;
  return (
    <>
      {/* loading state for transfer */}
      {loadTransfer && (
        <Feedbacks>
          <BeatLoader size={50} color="#173f80" />
        </Feedbacks>
      )}

      {/* frequent transfers */}
      <div className="space-y-2">
        <p className="text-slate-600 font-medium text-sm">Recent Transfers</p>
        <div className="flex space-x-4">
          <RecentTransfer />
        </div>
      </div>

      <button onClick={getUsers}> Get users</button>
      {/* Transfer form  */}
      <form className="space-y-[1em]" onSubmit={transferFunds}>
        <Select
          placeholder="Bank"
          options={options}
          filterOption={customSearch}
          onChange={(e: any) => setSelected(e.value)}
        />
        <div>
          <Input
            type="text"
            placeholder="Beneficiary Account Number"
            value={accNum}
            onChange={handleChange}
          />
          <div className="text-right w-[95%] mx-auto">
            {isLoading && !accName && <div>...</div>}
            {accNum && !selected && (
              <div className="text-[#ee585e] text-sm font-medium ">
                You know you need a bank right
              </div>
            )}
            {!isLoading && accName?.data?.message && (
              <div className="text-[#ee585e] text-sm font-medium ">
                Account name check failed
              </div>
            )}
            {accName && !isLoading && (
              <p className="text-slate-800 text-sm font-medium ">
                {accName?.data.account_name}
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
          {amountTransferredByUser > currentUser?.balance && (
            <p className="text-[#ee585e] text-sm font-medium text-right ">
              Max Amount Exceeded
            </p>
          )}

          <p className="text-slate-400 text-xs">
            Maximum Amount:
            <span className="text-p-blue font-medium text-sm ml-2">
              &#8358; {formatNumber(currentUser?.balance)}
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

        <Button disabled={!isValid && loadTransfer}>Proceed</Button>
      </form>
    </>
  );
}
