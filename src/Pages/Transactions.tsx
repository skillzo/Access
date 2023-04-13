import React from "react";
import Info from "../components/Transactions/Info";
import { useUser } from "../store/context";
import { v4 as uuidv4 } from "uuid";

export default function Transactions() {
  const { currentUser: user } = useUser();
  return (
    <div className="space-y-4">
      <p className="text-slate-600 text-sm font-medium">
        11 Mar 2023, SATURDAY
      </p>
      <div className="border bg-white w-full  space-y-2">
        {user?.transaction_details.map((item: any) => {
          return (
            <Info
              key={uuidv4()}
              amount={item.transaction_amount}
              remarks={item.remark}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
}
