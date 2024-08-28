import "./Profile.css";
import { useContext, useState } from "react";
import { UserContextProvider } from "../../context/userContext";
import FieldEdit from "./FieldEdit/FieldEdit";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
export default function Profile() {
  const { userStatus } = useContext(UserContextProvider);
  const [toggleEdit, settoggleEdit] = useState(false);

  const payload = {};

  return (
    <>
      {userStatus.data && (
        <div className="profile-page-wrapper">
          <article className="profile-page-container">
            <h2 className="profile-page-title">Profile</h2>
            <div className="profle-page-text">
              Username: {userStatus.data.username}
            </div>
            <div className="profle-page-text">
              Full name: {userStatus.data.full_name}
            </div>
            <img
              src={userStatus.data.profile_picture}
              width={300}
              height={300}
            />

            <div className="profile-page-profile-content">
              {userStatus.data.profile_content}
            </div>
            <span
              className="profile-page-edit"
              onClick={() => settoggleEdit(true)}
            >
              Edit Profile
            </span>
          </article>
          <EditProfileModal
            user={userStatus.data}
            visible={toggleEdit}
            closeModal={() => {
              settoggleEdit(false);
            }}
          />
        </div>
      )}
    </>
  );
}
