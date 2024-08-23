import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { UserContextProvider } from "../../context/userContext";
import FieldEdit from "./FieldEdit/FieldEdit";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
export default function Profile() {
  const { userStatus } = useContext(UserContextProvider);
  const [toggleEdit, settoggleEdit] = useState(false);

  const payload = {};

  function handleEditContent(text, fieldType) {
    payload[fieldType] = text;

    console.log(payload);
  }

  return (
    <>
      {userStatus.data && (
        <div className="profile-page-wrapper">
          <article className="profile-page-container">
            <span
              className="profile-page-edit"
              onClick={() => settoggleEdit(true)}
            >
              Edit Profile
            </span>

            <h3>Profile</h3>
            <div>Username: {userStatus.data.username}</div>
            <div>Full name: {userStatus.data.full_name}</div>
            <img
              src={userStatus.data.profile_picture}
              width={300}
              height={300}
            />

            <div className="profile-page-profile-content">
              {userStatus.data.profile_content}
            </div>
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
