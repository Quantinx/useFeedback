import Account from "../Account/Account";
import "./Header.css";
export default function Header() {
  return (
    <>
      <header className="header-container">
        <h1 className="header-title">useFeedback{"(code, mentors)"}</h1>
        <Account />
      </header>
    </>
  );
}
