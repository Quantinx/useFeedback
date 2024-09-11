import "./ExpandedHeaderProfile.css";
import { Link } from "react-router-dom";
export default function ExpandedHeaderProfile({ user, visible, hideModal }) {
  return (
    <>
      {visible && (
        <div className="expanded-header-parent">
          <nav className="expanded-header-profile-container">
            <div className="expanded-header-text-container">
              <div>{user.full_name}</div>
              <Link
                onClick={hideModal}
                to={"/profile"}
                className="expanded-header-profile-link"
              >
                View Profile
              </Link>
              <Link
                onClick={hideModal}
                className="expanded-header-profile-link"
                to={"/users/" + user.username + "/posts"}
              >
                View Posts
              </Link>
              <Link className="expanded-header-profile-link">Logout</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
