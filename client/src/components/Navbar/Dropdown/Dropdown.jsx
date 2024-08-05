import "./Dropdown.css";

export default function Dropdown({ categories, visible, loading, error }) {
  return (
    <>
      <div className="dropdown-container">
        {visible && !loading && !error && (
          <ul>
            {categories.map((category, i) => {
              return <li key={i}>{category.stack_name}</li>;
            })}
          </ul>
        )}
        {loading && visible && <div>Please wait</div>}
        {error && visible && <div>Something went wrong :c</div>}
      </div>
    </>
  );
}
