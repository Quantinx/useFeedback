import { useEffect, useState, useContext } from "react";
import useBackendService from "../../hooks/useBackendService";
import { UserContextProvider } from "../../context/userContext";
import "./Navbar.css";
import Dropdown from "./Dropdown/Dropdown";
import CreatePost from "./CreatePost/CreatePost";

export default function Navbar() {
  const { data, loading, error, getData } = useBackendService();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const { userStatus } = useContext(UserContextProvider);

  function handleMouseOver() {
    setDropdownVisible(true);
  }
  function handleMouseLeave() {
    setDropdownVisible(false);
  }

  function toggleCreatePost(visible) {
    console.log(visible);
    setCreatePostVisible(visible);
  }
  useEffect(() => {
    getData("/api/stacks");
  }, []);

  return (
    <>
      <nav className="navbar-container">
        <div
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          aria-haspopup
          className="category-container"
        >
          <div className="category-label">Categories</div>
          <Dropdown
            categories={data}
            visible={dropdownVisible}
            loading={loading}
            error={error}
            hideDropdown={handleMouseLeave}
          />
        </div>
        {userStatus.loggedIn ? (
          <div
            onClick={() => toggleCreatePost(true)}
            className="navbar-create-post"
          >
            Create post
          </div>
        ) : (
          <div className="navbar-create-post-nouser">
            Log in to create posts
          </div>
        )}
        <CreatePost
          handleClose={toggleCreatePost}
          visible={createPostVisible}
          categories={data}
        />
      </nav>
    </>
  );
}
