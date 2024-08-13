import Account from "../Account/Account";
import { Link } from "react-router-dom";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
export default function Header() {
  return (
    <>
      <header className="header-container">
        <Link to={"/"} className="header-link">
          <h1 className="header-title">useFeedback{"(code, mentors)"}</h1>
        </Link>
        <Navbar />
        <Account />
      </header>
    </>
  );
}
