import { createContext, useContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const users = [
  {
    id: uuidv4(),
    full_name: "Chukwu Emmanuel Oluwatobi",
    userName: "skillzo",
    transaction: [40000, 700000, -800000, 500000],
    password: "skillzo",
    transfer_24hrs: 2000000,
    transaction_details: [
      {
        transaction_amount: 1000000,
        transaction_type: "username",
        transaction_date: "2023-03-27T00:56:50.528Z",
        sender: "skillo",
        beneficiary: [
          {
            full_name: "Jacinta Uzoechina Ijeoma",
            account_number: "0098220998",
            bank_name: "access bank",
          },
        ],
        remark:
          "TRF/null/FRM EMMANURL OLUWATOBI CHUKWU TO DAMILOLA FUNMILOLA OLAYIWOLA",
        transaction_ref: "NX0001000100010101",
        transaction_status: "Successful",
      },
    ],
  },
  {
    id: uuidv4(),
    full_name: "Uzoechina Jacinta Ijeoma",
    userName: "jacy",
    transaction: [100000, -70000, -800000, 2000000],
    password: "jacy",
    transfer_24hrs: 1050000,
    transaction_details: [
      {
        transaction_amount: -1000000,
        transaction_type: "username",
        transaction_date: "2023-03-27T00:56:50.528Z",
        sender: "skillo",
        beneficiary: [
          {
            full_name: "Jacinta Uzoechina Ijeoma",
            account_number: "0098220998",
            bank_name: "access bank",
          },
        ],
        remark:
          "TRF/null/FRM EMMANURL OLUWATOBI CHUKWU TO DAMILOLA FUNMILOLA OLAYIWOLA",
        transaction_ref: "NX0001000100010101",
        transaction_status: "Successful",
      },
    ],
  },
];

const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currUser") || "[]")
  );

  const [isAuth, setIsAuth] = useState(false);

  const value = useMemo(
    () => ({
      currentUser,
      users,
      setCurrentUser,
      isAuth,
      setIsAuth,
    }),
    [currentUser, isAuth, setIsAuth]
  );
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
