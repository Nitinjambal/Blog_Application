import { createContext, useState } from "react";

export const DataContext = createContext();

const userDetail = {
  name: "",
  username: "",
};

const DataContextProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState(userDetail);
  const [isAuth, setAuth] = useState(false);
  return (
    <DataContext.Provider
      value={{ userAccount, setUserAccount, isAuth, setAuth }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
