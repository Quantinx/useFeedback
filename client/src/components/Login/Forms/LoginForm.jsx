import { useRef, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import sendData from "../../../helpers/sendData";
import "./Form.css";
import queryClient from "../../../query/queryClient";
import { toast } from "react-toastify";
export default function LoginForm({ closeWindow }) {
  const [buttonActive, setButtonActive] = useState(true);
  const loginMutation = useMutation({
    mutationFn: ({ url, method, payload }) => sendData(url, method, payload),
    mutationKey: "login",
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success("Login Successful!");
        queryClient.invalidateQueries("user");
        setTimeout(() => {
          closeWindow();
        }, 2000);
      }

      if (response.status === 401) {
        setButtonActive(true);
        toast.error("Invalid login");
      }
    },
    onError: (response) => {
      console.log("error: " + response);
    },
  });

  function handleClick(e) {
    e.preventDefault();
    setButtonActive(false);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);
    loginMutation.mutate({
      url: "/api/login",
      method: "POST",
      payload: payload,
    });
  }

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

        <button
          className="form-button"
          type="submit"
          disabled={!buttonActive}
          onClick={handleClick}
        >
          Login
        </button>
      </form>
    </>
  );
}
