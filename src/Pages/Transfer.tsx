import React, { useState } from "react";
import RecentTransfer from "../components/RecentTransfer";
import Button from "../components/tinycomp/Button";
import Input from "../components/tinycomp/Input";
import Select from "react-select";
import data from "../store/bankcode.json";
import axios from "axios";
import { useQuery } from "react-query";
import Feedbacks from "../components/feedbacks/Feedbacks";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

export default function Transfer() {
  const [selected, setSelected] = useState("058");
  const [accNum, setAccNum] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [loadTransfer, setLoadTransfer] = useState(false);

  const navigate = useNavigate();

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
  //   bank name filter function
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

  /**
   * It returns a promise that resolves to the result of an axios.get() call.
   * @returns An object with the following properties:
   *   data: {
   *     status: "success",
   *     message: "Account number is valid",
   *     data: {
   *       account_number: "1234567890",
   *       bank_code: "044",
   *       bank_name: "Access Bank Plc",
   *       account_name
   */
  const getData: any = async () => {
    const url = `https://maylancer.org/api/nuban/api.php?account_number=${accNum.trim()}&bank_code=${selected}`;
    return axios.get(url);
  };

  const {
    data: accName,
    isLoading,
    isError,
    refetch,
  }: any = useQuery("acc-name", getData, { enabled: false });

  // fetch accont name  api call
  const handleChange = (e: any) => {
    setAccNum(e.target.value);
    if (accNum.length == 9) {
      setTimeout(() => {
        refetch();
      }, 500);
    }
  };

  const addComma = (num: any) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const removeNonNumber = (num: any) => num.toString().replace(/[^0-9]/g, "");

  const handleAmount = (e: any) => {
    setTransferAmount(addComma(removeNonNumber(e.target.value)));
  };

  const isValid = selected && accName && transferAmount && narration;

  // handlesubmit
  const handleSubmit = () => {
    setLoadTransfer(true);
    setTimeout(() => {
      navigate("/success");
    }, 5000);
  };

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

      {/* Transfer form  */}
      <div className="space-y-[1em]">
        {/* A custom select component that takes in a placeholder, options and
        onChange function. */}
        <Select
          placeholder="Bank"
          options={options}
          filterOption={customSearch}
          onChange={(e: any) => setSelected(e.value)}
        />
        {/* enter account number and feedback */}
        <div>
          <Input
            type="text"
            placeholder="Beneficiary Account Number"
            value={accNum}
            onChange={handleChange}
          />
          <div className="text-right w-[95%] mx-auto">
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
        <Input
          type="text"
          placeholder="Narration"
          value={narration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNarration(e.target.value)
          }
        />

        <Button disabled={!isValid} onClick={handleSubmit}>
          Proceed
        </Button>
      </div>
    </>
  );
}
