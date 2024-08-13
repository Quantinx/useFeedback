import "./Dropdown.css";
import { Link } from "react-router-dom";
export default function Dropdown({
  categories,
  visible,
  loading,
  error,
  hideDropdown,
}) {
  return (
    <>
      <div className="dropdown-container">
        {visible && !loading && !error && (
          <ul className="dropdown-links">
            {categories.map((category, i) => {
              return (
                <li key={i} className="dropdown-link-container">
                  <Link
                    onClick={hideDropdown}
                    className="dropdown-link"
                    to={"/categories/" + category.stack_name}
                  >
                    {category.stack_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {loading && visible && <div>Please wait</div>}
        {error && visible && <div>Something went wrong :c</div>}
      </div>
    </>
  );
}
