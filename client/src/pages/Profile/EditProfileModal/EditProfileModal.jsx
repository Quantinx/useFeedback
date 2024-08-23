import { useState } from "react";
import "./EditProfileModal.css";

export default function EditProfileModal({ user, visible, closeModal }) {
  const [nameField, setNameField] = useState(user.username);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    user.profile_picture
  );
  const [profileContent, setProfileContent] = useState(user.profile_content);

  function handleSave(e) {
    e.preventDefault();
    const payload = {
      username: nameField,
      profile_picture: profilePictureUrl,
      profile_content: profileContent,
    };
    console.log(payload);
  }
  return (
    <>
      {visible && (
        <div className="edit-profile-container">
          <div className="edit-profile-close-container">
            <div className="edit-profile-close" onClick={closeModal}>
              X
            </div>
          </div>
          <form className="edit-profile-form-container">
            <h3 className="edit-profile-title">Edit Profile</h3>
            <div className="edit-profile-input-container">
              <label className="edit-profile-label" htmlFor="username">
                Username
              </label>
              <input
                name="username"
                id="username"
                className="edit-profile-input"
                value={nameField}
                onChange={(e) => {
                  setNameField(e.target.value);
                }}
              />
            </div>
            <div className="edit-profile-input-container">
              <label className="edit-profile-label" htmlFor="pfp">
                Picture
              </label>
              <input
                name="pfp"
                id="pfp"
                className="edit-profile-input"
                value={profilePictureUrl}
                onChange={(e) => {
                  setProfilePictureUrl(e.target.value);
                }}
              />
            </div>
            <div className="edit-profile-input-container">
              <label
                className="edit-profile-label-textarea"
                htmlFor="profileContent"
              >
                Bio
              </label>
              <textarea
                name="profileContent"
                id="profileContent"
                className="edit-profile-textarea"
                value={profileContent}
                onChange={(e) => {
                  setProfileContent(e.target.value);
                }}
              />
            </div>
            <button className="edit-profile-button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
