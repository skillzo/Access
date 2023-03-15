import React, { useState } from "react";
import RecentTransfer from "../components/RecentTransfer";
import Button from "../components/tinycomp/Button";
import Input from "../components/tinycomp/Input";
import Select from "react-select";
import data from "../store/bankcode.json";
import axios from "axios";
import { useQuery } from "react-query";

export default function Transfer() {
  const [selected, setSelected] = useState("058");
  const [accNum, setAccNum] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const currentUser = [
    {
      id: 1,
      name: "Chukwu Emmanuel",
      user: "skillzo",
      transactions: [4000, 60000, 700000, 400000],
      password: "skillzo",
    },
  ];

  const options: any = [];
  data.map((item) => {
    const label = item.name;
    const value = item.code;
    options.push({
      label,
      value,
    });
  });

  const getData: any = async () => {
    const url = `https://maylancer.org/api/nuban/api.php?account_number=${accNum.trim()}&bank_code=${selected}`;
    return axios.get(url);
  };

  const {
    data: accName,
    isLoading,
    isFetching,
    refetch,
  } = useQuery("acc-name", getData, { enabled: false });

  // fetch accont name  api call

  const handleChange = (e: any) => {
    setAccNum(e.target.value);
    if (accNum.length == 9) {
      setTimeout(() => {
        refetch();
        console.log("fetch data");
      }, 500);
    }
  };

  const addComma = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const removeNonNumber = (num: number) =>
    num.toString().replace(/[^0-9]/g, "");

  const handleAmount = (e: any) => {
    setTransferAmount(addComma(removeNonNumber(e.target.value)));
  };

  return (
    <>
      {/* frequent transfers */}
      <div className="space-y-2">
        <p className="text-slate-600 font-medium text-sm">Recent Transfers</p>
        <div className="flex space-x-4">
          <RecentTransfer />
        </div>
      </div>

      {/* Transfer form  */}
      <div className="space-y-[1em]">
        {/* <div className="bg-white flex justify-between items-center w-full px-[1em] py-[0.8em]  rounded-sm outline-none border border-[#bbbcbc8e]">
          <p className="text-slate-400">Bank</p>
          <div className="p-1 rounded-full bg-[#e7eefc]">
            <BiChevronDown color="#254b88" />
          </div>
        </div> */}

        <Select
          placeholder="Bank"
          options={options}
          onChange={(e: any) => setSelected(e.value)}
        />
        <button onClick={() => refetch()}>Fetch</button>
        {/* enter account number and feedback */}
        <div>
          <Input
            type="text"
            placeholder="Beneficiary Account Number"
            value={accNum}
            onChange={handleChange}
          />
          <div className="text-right w-[95%] mx-auto">
            {accName && !isLoading && (
              <p className="text-slate-800 text-sm font-medium ">
                {accName?.data.account_name}
              </p>
            )}

            {isLoading || (isFetching && !accName && <div>...</div>)}
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

        <Input type="text" placeholder="Narration" />
        <Button disabled>Proceed</Button>
      </div>
    </>
  );
}
