import { useState, useEffect, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import getData from "../helpers/getData";
export const UserContextProvider = createContext();
export const UserProvider = ({ children }) => {
  const {
    data: userStatus,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getData("/api/users"),
    refetchOnWindowFocus: false,
    placeholderData: { loggedIn: false },
    retry: false,
    staleTime: 0,
  });
  function checkLogin() {
    getData("/api/users");
  }

  const value = { userStatus, checkLogin };

  return (
    <UserContextProvider.Provider value={value}>
      {children}
    </UserContextProvider.Provider>
  );
};
