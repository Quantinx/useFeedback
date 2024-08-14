import { useContext, useState } from "react";
import { UserContextProvider } from "../../context/userContext";
import Login from "../Login/Login";
import "./Account.css";
export default function Account() {
  const { userStatus } = useContext(UserContextProvider);

  const [showLogin, setShowLogin] = useState(false);
  function toggleLogin(visible) {
    setShowLogin(visible);
    console.log(visible);
  }

  return (
    <>
      <div className="account-login-text">
        {userStatus.loggedIn && <div>Welcome {userStatus.data.username}</div>}
        {!userStatus.loggedIn && (
          <div onClick={() => toggleLogin(true)}>Login/Register</div>
        )}
      </div>
      <Login handleClick={toggleLogin} visible={showLogin} />
    </>
  );
}
