import { useEffect, useRef, useContext, useState } from "react";
import useBackendService from "../../../hooks/useBackendService";
import { UserContextProvider } from "../../../context/userContext";
import "./Form.css";
export default function LoginForm({ closeWindow }) {
  const { data, loading, status, error, sendData } = useBackendService();
  const { checkLogin } = useContext(UserContextProvider);
  const [message, setMessage] = useState();

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
    if (status === 200) {
      checkLogin();
      setMessage("login successful");
      setTimeout(() => {
        closeWindow();
      }, 2000);
    }

    if (status === 401) {
      setMessage("Invalid Login");
    }
  }, [loading]);

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <>
      <form className="form-container">
        <h2 className="form-title">Login</h2>

        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email*"
          required={true}
          ref={emailRef}
        ></input>

        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          ref={passwordRef}
        ></input>

        <button className="form-button" type="submit" onClick={handleClick}>
          Login
        </button>
        <div className="form-message">{message}</div>
      </form>
    </>
  );
}
