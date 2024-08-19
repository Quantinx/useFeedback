import { useContext, useState } from "react";
import { UserContextProvider } from "../../context/userContext";
import Login from "../Login/Login";
import useModalStore from "../../stores/modals";
import "./Account.css";
export default function Account() {
  const { userStatus } = useContext(UserContextProvider);
  const { loginVisible, setLoginVisible } = useModalStore();
  function toggleLogin(visible) {
    setLoginVisible(visible);
  }

  return (
    <>
      <div className="account-login-text">
        {userStatus.loggedIn && <div>Welcome {userStatus.data.username}</div>}
        {!userStatus.loggedIn && (
          <div onClick={() => toggleLogin(true)}>Login/Register</div>
        )}
      </div>
      <Login handleClick={toggleLogin} visible={loginVisible} />
    </>
  );
}
