import React, { useState } from "react";
import BankTransfer from "../components/Transfer/BankTransfer";
import Username from "../components/Transfer/Username";

export default function Transfer() {
  const [usernameTransfer, setUsernameTransfer] = useState(false);
  const active = "text-td-ash w-max";
  const notActive = "font-semibold text-p-blue w-max";

  return (
    <>
      <div className="flex w-[80%] mx-auto justify-center space-x-8">
        <div
          className={usernameTransfer ? active : notActive}
          onClick={() => setUsernameTransfer(false)}
        >
          Bank Transfer
        </div>
        <div
          className={usernameTransfer ? notActive : active}
          onClick={() => setUsernameTransfer(true)}
        >
          @Username
        </div>
      </div>

      {usernameTransfer ? <Username /> : <BankTransfer />}
    </>
  );
}
