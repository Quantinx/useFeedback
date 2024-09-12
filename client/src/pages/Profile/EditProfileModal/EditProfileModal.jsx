import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import sendData from "../../../helpers/sendData";
import * as Yup from "yup";
import queryClient from "../../../query/queryClient";
import "./EditProfileModal.css";
import { toast } from "react-toastify";

export default function EditProfileModal({ user, visible, closeModal }) {
  const [nameField, setNameField] = useState(user.username);
  const [fullNameField, setFullNameField] = useState(user.full_name);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    user.profile_picture
  );
  const [profileContent, setProfileContent] = useState(user.profile_content);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const profileMutator = useMutation({
    mutationKey: "profile",
    mutationFn: ({ url, method, payload }) => sendData(url, method, payload),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries("user");
      } else {
        toast.error("Failed to update profile");
      }
      setButtonEnabled(true);
    },
  });

  const profileSchema = Yup.object().shape({
    username: Yup.string()
      .min(5)
      .max(20)
      .matches(
        /^[a-zA-Z0-9_-]*$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    profile_picture: Yup.string().min(5).max(255),
    full_name: Yup.string().min(5).max(20),
    profile_content: Yup.string().min(5).max(255),
  });

  function handleSave(e) {
    e.preventDefault();
    const payload = {
      username: nameField,
      profile_picture: profilePictureUrl,
      full_name: fullNameField,
      profile_content: profileContent,
    };

    profileSchema
      .validate(payload, { abortEarly: true })
      .then((valid) => {
        setButtonEnabled(false);
        profileMutator.mutate({
          url: "/api/users/",
          method: "PATCH",
          payload: payload,
        });
      })
      .catch((err) => {
        toast.warn(err.errors[0]);
      });
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
              <label className="edit-profile-label" htmlFor="fullname">
                Full name
              </label>
              <input
                name="fullname"
                id="fullname"
                className="edit-profile-input"
                value={fullNameField}
                onChange={(e) => {
                  setFullNameField(e.target.value);
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

            <button
              className="edit-profile-button"
              onClick={handleSave}
              disabled={!buttonEnabled}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
