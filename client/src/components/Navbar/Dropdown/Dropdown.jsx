import "./Dropdown.css";
import { Link } from "react-router-dom";
export default function Dropdown({ categories, visible, loading, error }) {
  return (
    <>
      <div className="dropdown-container">
        {visible && !loading && !error && (
          <ul>
            {categories.map((category, i) => {
              return (
                <li key={i}>
                  <Link to={"/categories/" + category.stack_name}>
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
