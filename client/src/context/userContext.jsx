import { useState, useEffect, createContext } from "react";
import useBackendService from "../hooks/useBackendService";

export const UserContextProvider = createContext();
export const UserProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState({ loggedIn: false });
  const { data, status, loading, error, getData, sendData } =
    useBackendService();
  function checkLogin() {
    getData("/api/users");
  }
  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (status === 200) {
      setUserStatus(data);
      console.log(data);
    }
  }, [loading]);

  const value = { userStatus, setUserStatus, checkLogin };

  return (
    <UserContextProvider.Provider value={value}>
      {children}
    </UserContextProvider.Provider>
  );
};
