import { useEffect, useRef, useContext } from "react";
import useBackendService from "../../../hooks/useBackendService";
import { UserContextProvider } from "../../../context/userContext";

export default function LoginForm({ closeWindow }) {
  const { data, loading, status, error, sendData } = useBackendService();
  const { setUserStatus, checkLogin } = useContext(UserContextProvider);

  function handleClick(e) {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);
    sendData("/api/login", "POST", payload);
  }

  useEffect(() => {
    console.log(status);
    if (status === 200) {
      checkLogin();
      closeWindow();
    }
  }, [loading]);

  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <>
      <form>
        <h2>Login</h2>
        <label>
          Email:
          <input
            type="email"
            name="email"
            required={true}
            ref={emailRef}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required={true}
            ref={passwordRef}
          ></input>
        </label>
        <button type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </>
  );
}
