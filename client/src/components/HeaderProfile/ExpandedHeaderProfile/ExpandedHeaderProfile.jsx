import "./ExpandedHeaderProfile.css";
import { Link } from "react-router-dom";
export default function ExpandedHeaderProfile({ user, visible, hideModal }) {
  return (
    <>
      {visible && (
        <div className="expanded-header-profile-container">
          <div>{user.username}</div>
          <div>{user.full_name}</div>
          <Link
            onClick={hideModal}
            to={"/profile"}
            className="expanded-header-profile-link"
          >
            View Profile
          </Link>
          <Link
            className="expanded-header-profile-link"
            to={"/users/" + user.username + "/posts"}
          >
            View Posts
          </Link>
          <Link className="expanded-header-profile-link">Logout</Link>
        </div>
      )}
    </>
  );
}
