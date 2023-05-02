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
      transaction: [100000, -70000, -800000, 2000000],
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
      id: "T1XwocBvjQHmbRuziPpc",
      transfer_24hrs: 2000000,
      full_name: "Chukwu Emmanuel Oluwatobi",
      transaction: [40000, 700000, -800000, 500000],
    },
    {
      transaction_details: [],
      transfer_24hrs: 0,
      full_name: "augustmiles",
      id: "o4EII1M9lTdCWea1IUm0",
      userName: "skillzo2",
      transaction: [0],
      password: "skillzo",
    },
    {
      id: "pcqZUBfEUDjDG50zMiR3",
      password: "skillzo",
      transaction: [3000000],
      full_name: "august4miles4",
      transfer_24hrs: 0,
      userName: "skillzo4",
      transaction_details: [],
    },
    {
      transfer_24hrs: 0,
      full_name: "augustmiles",
      transaction_details: [],
      transaction: [0],
      password: "skillzo",
      id: "wV69pyhfuAAzXuqbobhs",
      userName: "skillzo1",
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

  console.log("users", users);
  //
  // function to signup a new account
  const addUser = async ({ fullName, userName, password }) => {
    const userSchema = {
      id: uuidv4(),
      full_name: fullName,
      userName,
      transaction: [0],
      password,
      transfer_24hrs: 0,
      transaction_details: [],
    };
    await addDoc(usersCollection, userSchema);
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      setCurrentUser,
      users,
      setUsers,
      getUsers,
      addUser,
    }),
    [currentUser, users]
  );
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => {
  return useContext(userContext);
};
