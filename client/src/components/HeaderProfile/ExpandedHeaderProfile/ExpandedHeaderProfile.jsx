import "./ExpandedHeaderProfile.css";
import { Link } from "react-router-dom";
export default function ExpandedHeaderProfile({ user, visible, hideModal }) {
  return (
    <>
      {visible && (
        <div className="expanded-header-profile-container">
          <div>{user.username}</div>
          <div>{user.full_name}</div>
          <Link onClick={hideModal} to={"/profile"}>
            View Profile
          </Link>
          <Link>View Posts</Link>
          <Link>Logout</Link>
        </div>
      )}
    </>
  );
}
