import { useEffect, useState, useContext } from "react";
import { UserContextProvider } from "../../context/userContext";
import "./Navbar.css";
import Dropdown from "./Dropdown/Dropdown";
import CreatePost from "./CreatePost/CreatePost";
import useModalStore from "../../stores/modals";
import getData from "../../helpers/getData";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const { userStatus } = useContext(UserContextProvider);
  const { setLoginVisible } = useModalStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("/api/stacks"),
    refetchOnWindowFocus: false,
  });
  function handleMouseOver() {
    setDropdownVisible(true);
  }
  function handleMouseLeave() {
    setDropdownVisible(false);
  }

  function handleLoginClick() {
    setLoginVisible(true);
  }

  function toggleCreatePost(visible) {
    console.log(visible);
    setCreatePostVisible(visible);
  }

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
            loading={isLoading}
            error={isError}
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
          <div className="navbar-create-post-nouser" onClick={handleLoginClick}>
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
