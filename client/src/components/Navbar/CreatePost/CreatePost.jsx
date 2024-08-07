import { useEffect, useRef, useState } from "react";
import "./CreatePost.css";
import useBackendService from "../../../hooks/useBackendService";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../../Editor/Editor";

export default function CreatePost({ visible, categories, handleClose }) {
  const catergoryRef = useRef();
  const titleRef = useRef();
  const editorRef = useRef(null);

  const redirect = useNavigate();

  const [message, setMessage] = useState();

  const { data, loading, error, status, sendData } = useBackendService();

  function handleSubmit(e) {
    e.preventDefault();
    const category = catergoryRef.current.value;
    const title = titleRef.current.value;
    const content = editorRef.current.getEditorData();
    const payload = { stack: category, title: title, content: content };
    sendData("/api/posts", "POST", payload);
  }

  useEffect(() => {
    if (status === 200) {
      setMessage("Post added sucessfully ");
      redirect("/posts/" + data.post);
      handleClose(false);
    }
    if (status === 500) {
      setMessage("Failed to create post");
    }
  }, [loading]);

  return (
    <>
      {visible && (
        <div className="create-post-container">
          <div onClick={() => handleClose(false)}>X</div>
          <div>Create a post here</div>
          <form>
            <label>
              Category:
              <select ref={catergoryRef}>
                {categories.map((category, i) => {
                  return (
                    <option key={i} value={category.stack_name}>
                      {category.stack_name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Title:
              <input ref={titleRef}></input>
            </label>
            <label>
              Post:
              <TiptapEditor editorRef={editorRef} />
            </label>
            <button type="submit" onClick={handleSubmit}>
              Create post
            </button>
            {message}
          </form>
        </div>
      )}
    </>
  );
}
