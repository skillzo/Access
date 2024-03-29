import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "./Firebase/Firebase";

const userContext = createContext();

export const ContextProvider = ({ children }) => {
  const initialUsers = [
    {
      id: "4rtxveVae5OFbdZQdulv",
      full_name: "Uzoechina Jacinta Ijeoma",
      userName: "jacy",
      password: "jacy",
      balance: 300000,
      transfer_24hrs: 1050000,
      recent_transaction: [
        {
          id: uuidv4(),
          bankCode: "058",
          account_number: "0243563736",
          full_name: "Chukwu Emmanuel Oluwatobi",
        },
        {
          id: uuidv4(),
          bankCode: "50211",
          account_number: "2023812295",
          full_name: "Uzoechina Jacinta ijeoma ",
        },
      ],
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
    },
    {
      id: "T1XwocBvjQHmbRuziPpc",
      full_name: "Chukwu Emmanuel Oluwatobi",
      userName: "skillzo",
      password: "skillzo",
      balance: 3000000,
      transfer_24hrs: 2000000,
      recent_transaction: [
        {
          id: uuidv4(),
          bankCode: "058",
          account_number: "0243563736",
          full_name: "Chukwu Emmanuel Oluwatobi",
        },
        {
          id: uuidv4(),
          bankCode: "50211",
          account_number: "2023812295",
          full_name: "Uzoechina Jacinta ijeoma ",
        },
      ],
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
    },
  ];
  const [users, setUsers] = useState([]);
  const [persistName, setPersistName] = useState(
    localStorage.getItem("persistname") || ""
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currUser") || "[]")
  );

  // fetch database for users and store in state
  const usersCollection = collection(db, "users");
  const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollection);
    setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // hydrate users array from firebase
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUsers();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      users,
      setCurrentUser,
      users,
      setUsers,
      getUsers,
      persistName,
      setPersistName,
    }),
    [currentUser, users]
  );
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => {
  return useContext(userContext);
};
