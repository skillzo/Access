import { createContext, useContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const ContextProvider = ({ children }) => {
  let currentUser;

  const users = [
    {
      id: uuidv4(),
      full_name: "Chukwu Emmanuel",
      userName: "skillzo",
      transaction: [40000, 700000, -800000, 500000],
      password: "skillzo",
      transfer_24hrs: 2000000,
    },
    {
      id: uuidv4(),
      full_name: "Uzoechina Jacinta Ijeoma",
      userName: "jacy",
      transaction: [100000, -70000, -800000, 2000000],
      password: "jacy",
      transfer_24hrs: 1050000,
    },
  ];

  currentUser = users[1];
  const value = useMemo(() => ({ currentUser }), [currentUser]);
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
