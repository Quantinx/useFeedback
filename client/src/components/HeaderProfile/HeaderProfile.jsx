import { useState } from "react";
import "./HeaderProfile.css";
import ExpandedHeaderProfile from "./ExpandedHeaderProfile/ExpandedHeaderProfile";

export default function HeaderProfile({ user }) {
  const [profileExpanded, setProfileExpanded] = useState(false);
  return (
    <>
      <div
        className="header-profile-container"
        onClick={() => setProfileExpanded(!profileExpanded)}
      >
        <img
          src={user.profile_picture}
          width={50}
          height={50}
          className="header-profile-user-img"
        />
        <div className="header-profile-username">{user.username}</div>
      </div>
      <ExpandedHeaderProfile
        user={user}
        visible={profileExpanded}
        hideModal={() => setProfileExpanded(false)}
      />
    </>
  );
}
