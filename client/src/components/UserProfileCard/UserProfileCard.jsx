import "./UserProfileCard.css";

export default function UserProfileCard({ username, profilePicture }) {
  return (
    <>
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
    </>
  );
}
