import { useEffect, useState } from "react";
import useBackendService from "../../hooks/useBackendService";
import "./Navbar.css";
import Dropdown from "./Dropdown/Dropdown";

export default function Navbar() {
  const { data, loading, error, getData } = useBackendService();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  function handleMouseOver() {
    setDropdownVisible(true);
  }
  function handleMouseLeave() {
    setDropdownVisible(false);
  }

  useEffect(() => {
    getData("/api/stacks");
  }, []);

  return (
    <>
      <nav className="navbar-container">
        <div
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          aria-haspopup
          className="category-container"
        >
          Categories
          <Dropdown
            categories={data}
            visible={dropdownVisible}
            loading={loading}
            error={error}
          />
        </div>
        <div>Create post</div>
      </nav>
    </>
  );
}
