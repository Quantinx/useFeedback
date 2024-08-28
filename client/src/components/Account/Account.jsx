import { useContext, useState } from "react";
import { UserContextProvider } from "../../context/userContext";
import Login from "../Login/Login";
import useModalStore from "../../stores/modals";
import "./Account.css";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
export default function Account() {
  const { userStatus } = useContext(UserContextProvider);
  const { loginVisible, setLoginVisible } = useModalStore();
  function toggleLogin(visible) {
    setLoginVisible(visible);
  }

  return (
    <>
      <div className="account-login-text">
        {userStatus.loggedIn && (
          <div>
            <HeaderProfile user={userStatus.data} />
          </div>
        )}
        {!userStatus.loggedIn && (
          <div
            className="account-login-nouser"
            onClick={() => toggleLogin(true)}
          >
            Login/Register
          </div>
        )}
      </div>
      <Login handleClick={toggleLogin} visible={loginVisible} />
    </>
  );
}
