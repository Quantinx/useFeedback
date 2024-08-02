import { useState } from "react";
import LoginForm from "./Forms/LoginForm";
import "./Login.css";
import RegisterForm from "./Forms/RegisterForm";
export default function Login({ visible, handleClick }) {
  const [existingUser, setExistingUser] = useState(true);
  function handleToggle() {
    setExistingUser(!existingUser);
  }
  return (
    <>
      {visible && (
        <>
          <div className="login-container">
            <div onClick={() => handleClick(false)}>X</div>
            <div>
              {existingUser ? (
                <LoginForm closeWindow={() => handleClick(false)} />
              ) : (
                <RegisterForm />
              )}
            </div>
            {existingUser ? (
              <div onClick={handleToggle}>Don't have an account?</div>
            ) : (
              <div onClick={handleToggle}>Already have an account?</div>
            )}
          </div>
        </>
      )}
    </>
  );
}
