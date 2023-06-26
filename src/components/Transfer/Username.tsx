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
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../store/Firebase/Firebase";
import Toast from "../Toast";
import { toast } from "react-toastify";
import useDebounce from "../../utils/hooks/useDebounce";

export default function Username() {
  const date = new Date();
  const currDate = date.toJSON();
  const navigate = useNavigate();
  const { currentUser, users } = useUser();
  const [userName, setUserName] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loadTransfer, setLoadTransfer] = useState(false);
  const [beneInitialState, setBeneInitialState] = useState<Object | any>({});
  const [currInitialState, setCurrInitialState] = useState<Object | any>({});

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

  // //////////////////////////////////////

  // get objects to be updated in firebase
  const beneficiary_user_id = useDebounce(
    `${beneficiary?.userName?.trim()}id`,
    2000
  );
  const beneRef = doc(db, "users", beneficiary_user_id);
  const currRef = doc(db, "users", `${currentUser?.userName?.trim()}id`);

  // get initial state from firebase
  const getBeneInitialState = async () => {
    if (beneficiary_user_id)
      try {
        const response = await getDoc(beneRef);
        if (response?.data() === undefined) {
          toast.error("Beneficiary does not exist");
        }
        setBeneInitialState(response?.data());
        return;
      } catch (e: any) {
        toast.error("Beneficiary does not exist");
      }
  };
  const getCurrInitialState = async () => {
    try {
      const response = await getDoc(currRef);
      if (response?.data() === undefined) {
        toast.error("something went wrong with your account");
      }
      setCurrInitialState(response?.data());
      return;
    } catch (e: any) {
      toast.error("something went wrong with your account");
    }
  };

  // transfer details for receiver
  const beneficiarytrxdetails: any = {
    transaction_amount: amountTransferredByUser,
    transaction_type: "USERNAME",
    transaction_date: currDate,
    sender: currentUser?.userName,
    remark: `via Access ${narration}`,
    transaction_ref: uuidv4(),
    transaction_status: "Successful",
  };
  // transfer details for sender
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
  const transferFunds = async (e: any) => {
    e.preventDefault();

    // update firestore
    try {
      await updateDoc(currRef, {
        balance: increment(-amountTransferredByUser),
        transfer_24hrs: increment(-amountTransferredByUser),
        transaction_details: arrayUnion(trxdetails),
      });
      await updateDoc(beneRef, {
        balance: increment(amountTransferredByUser),
        transfer_24hrs: increment(-amountTransferredByUser),
        transaction_details: arrayUnion(beneficiarytrxdetails),
      });

      // update localState and initiate transfer sequence
      currentUser?.transaction_details.push(trxdetails);
      currentUser.transfer_24hrs += amountTransferredByUser;
      currentUser.balance += -amountTransferredByUser;
      localStorage.setItem("currUser", JSON.stringify(currentUser));
      setLoadTransfer(true);
      setTimeout(() => {
        navigate("/success");
      }, 1000);
      return;
    } catch (e) {
      toast.error("Transafer Failed ");
    }
  };

  // basic checks before tranfer
  const userEnteredThierName =
    userName.toLowerCase().trim() === currentUser?.userName;
  const isValid =
    Boolean(beneficiary?.full_name) &&
    !userEnteredThierName &&
    Boolean(currentUser?.balance > amountTransferredByUser) &&
    narration &&
    Boolean(beneInitialState?.id) &&
    Boolean(currInitialState?.id);

  return (
    <>
      <Toast />
      {/* loading state for transfer */}
      {loadTransfer && (
        <Feedbacks>
          <BeatLoader size={50} color="#173f80" />
        </Feedbacks>
      )}
      <form className="space-y-[1em]" onSubmit={transferFunds}>
        <div>
          <Input
            type="text"
            placeholder="Beneficiary Username"
            value={userName}
            onBlur={() => {
              getBeneInitialState();
              getCurrInitialState();
            }}
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

            {!userEnteredThierName && (
              <p className="text-slate-800 text-sm font-medium ">
                {beneficiary?.full_name}
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

        <Button disabled={!isValid}>Proceed</Button>
      </form>
    </>
  );
}
