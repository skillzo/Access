import React from "react";

interface props {
  name: string;
  item: any;
  refetch: any;
  setAccNum: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function RecentTransfer({
  name,
  item,
  setSelected,
  setAccNum,
  refetch,
}: props) {
  const header = name?.split(" ");

  return (
    <div
      onClick={() => {
        setSelected(item.bankCode);
        setAccNum(item.account_number);
        refetch();
      }}
      className="bg-white w-[100px] max-w-[150px] h-[100px] py-[1em] px-[1.5em] border flex flex-col items-center justify-center space-y-2"
    >
      <div className="bg-[#e0e5ee] w-[40px] h-[40px] flex items-center justify-center rounded-full">
        {header[1]?.charAt(0)}
      </div>
      <p className="text-center text-xs ">{header[1]}</p>
    </div>
  );
}
