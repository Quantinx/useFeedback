import Account from "../Account/Account";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  return (
    <>
      <header className="header-container">
        <Link to={"/"}>
          <h1 className="header-title">useFeedback{"(code, mentors)"}</h1>
        </Link>
        <Account />
      </header>
    </>
  );
}
