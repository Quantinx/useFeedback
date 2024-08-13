import "./ToolbarButton.css";
export default function ToolbarButton({ icon, active, size, handleClick }) {
  const iconPath = "/icons/" + icon + ".svg";
  return (
    <>
      <span
        onClick={handleClick}
        aria-pressed={active}
        role="button"
        aria-label={icon}
      >
        <img
          src={iconPath}
          height={size}
          width={size}
          className={`toolbar-icon ${active ? "toolbar-icon-active" : ""}`}
          alt={icon + " icon"}
        ></img>
      </span>
    </>
  );
}
