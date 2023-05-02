import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "./Firebase/Firebase";

const userContext = createContext();

export const ContextProvider = ({ children }) => {
  const initialUsers = [
    {
      id: "4rtxveVae5OFbdZQdulv",
      password: "jacy",
      balance: 300000,
      full_name: "Uzoechina Jacinta Ijeoma",
      transaction_details: [
        {
          sender: "skillo",
          transaction_status: "Successful",
          remark:
            "TRF/null/FRM EMMANURL OLUWATOBI CHUKWU TO DAMILOLA FUNMILOLA OLAYIWOLA",
          transaction_ref: "NX0001000100010101",
          transaction_amount: -1000000,
          beneficiary: [
            {
              full_name: "Jacinta Uzoechina Ijeoma",
              bank_name: "access bank",
              account_number: "0098220998",
            },
          ],
          transaction_type: "username",
          transaction_date: "2023-03-27T00:56:50.528Z",
        },
      ],
      transfer_24hrs: 1050000,
      userName: "jacy",
    },
    {
      transaction_details: [
        {
          beneficiary: [
            {
              bank_name: "access bank",
              full_name: "Jacinta Uzoechina Ijeoma",
              account_number: "0098220998",
            },
          ],
          sender: "skillo",
          transaction_date: "2023-03-27T00:56:50.528Z",
          remark:
            "TRF/null/FRM EMMANURL OLUWATOBI CHUKWU TO DAMILOLA FUNMILOLA OLAYIWOLA",
          transaction_ref: "NX0001000100010101",
          transaction_amount: 1000000,
          transaction_status: "Successful",
          transaction_type: "username",
        },
      ],
      userName: "skillzo",
      password: "skillzo",
      balance: 3000000,
      id: "T1XwocBvjQHmbRuziPpc",
      transfer_24hrs: 2000000,
      full_name: "Chukwu Emmanuel Oluwatobi",
    },
  ];
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currUser") || "[]")
  );

  // fetch database for users and store in state
  const usersCollection = collection(db, "users");
  const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollection);
    setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  const value = useMemo(
    () => ({
      currentUser,
      users,
      setCurrentUser,
      users,
      setUsers,
      getUsers,
    }),
    [currentUser, users]
  );
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => {
  return useContext(userContext);
};
