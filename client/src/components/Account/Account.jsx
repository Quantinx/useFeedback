import { useContext, useState } from "react";
import { UserContextProvider } from "../../context/userContext";
import Login from "../Login/Login";

export default function Account() {
  const { userStatus } = useContext(UserContextProvider);

  const [showLogin, setShowLogin] = useState(false);
  function toggleLogin(visible) {
    setShowLogin(visible);
    console.log(visible);
  }

  return (
    <>
      <div style={{ color: "white" }}>
        {userStatus.loggedIn && <div>Welcome {userStatus.data.username}</div>}
        {!userStatus.loggedIn && (
          <div onClick={() => toggleLogin(true)}>Login/Register</div>
        )}
      </div>
      <Login handleClick={toggleLogin} visible={showLogin} />
    </>
  );
}
