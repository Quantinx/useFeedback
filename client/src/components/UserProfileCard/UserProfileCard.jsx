import "./UserProfileCard.css";
import { Link } from "react-router-dom";

export default function UserProfileCard({ username, profilePicture }) {
  return (
    <>
      <Link className="user-profile-card-link" to={"/users/" + username}>
        <div className="user-profile-card-container">
          <img
            src={profilePicture}
            height={50}
            width={50}
            alt=""
            className="user-profile-card-pfp-img"
          />
          <div>{username}</div>
        </div>
      </Link>
    </>
  );
}
