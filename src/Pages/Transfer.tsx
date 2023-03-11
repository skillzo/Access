import React, { useState } from "react";
import RecentTransfer from "../components/RecentTransfer";
import Button from "../components/tinycomp/Button";
import Input from "../components/tinycomp/Input";
import Select from "react-select";
import data from "../store/bankcode.json";
import axios from "axios";

export default function Transfer() {
  const [selected, setSelected] = useState("");
  const [accNum, setAccNum] = useState("");

  const options: any = [];
  data.map((item) => {
    const label = item.name;
    const value = item.code;
    options.push({
      label,
      value,
    });
  });

  const getData = () => {
    const url = `https://maylancer.org/api/nuban/api.php?account_number=${accNum}&bank_code=${selected}`;
    axios.get(url).then((res) => {
      console.log(res);
    });
  };

  const handleChange = (e: any) => {
    setAccNum(e.target.value);
    if (accNum?.length == 10) {
      getData();
    }
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

        {/* enter account number and feedback */}
        <div>
          <Input
            type="text"
            placeholder="Beneficiary Account Number"
            max={10}
            onChange={handleChange}
          />
          <div className="flex justify-between items-center w-[95%] mx-auto">
            <p className="text-slate-800 text-sm font-medium ">
              Chukwu Emmanuel Oluwatobi
            </p>
            <div>...</div>
          </div>
        </div>

        {/* enter amount */}
        <div>
          <Input type="text" placeholder="&#8358; Amount" />
          <p className="text-slate-400 text-xs">
            Maximum Amount:
            <span className="text-[#173f80] font-medium text-sm ml-2">
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
