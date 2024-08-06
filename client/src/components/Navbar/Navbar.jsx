import { useEffect, useState } from "react";
import useBackendService from "../../hooks/useBackendService";
import "./Navbar.css";
import Dropdown from "./Dropdown/Dropdown";
import CreatePost from "./CreatePost/CreatePost";

export default function Navbar() {
  const { data, loading, error, getData } = useBackendService();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [createPostVisible, setCreatePostVisible] = useState(false);
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
          Categories
          <Dropdown
            categories={data}
            visible={dropdownVisible}
            loading={loading}
            error={error}
          />
        </div>
        <div onClick={() => toggleCreatePost(true)}>Create post</div>
        <CreatePost
          handleClose={toggleCreatePost}
          visible={createPostVisible}
          categories={data}
        />
      </nav>
    </>
  );
}
