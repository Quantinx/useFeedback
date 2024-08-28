import { useRef, useState } from "react";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../../Editor/Editor";
import { useMutation } from "@tanstack/react-query";
import sendData from "../../../helpers/sendData";

export default function CreatePost({ visible, categories, handleClose }) {
  const catergoryRef = useRef();
  const titleRef = useRef();
  const editorRef = useRef(null);

  const redirect = useNavigate();

  const [message, setMessage] = useState();

  const postMutator = useMutation({
    mutationKey: "post",
    mutationFn: ({ url, method, payload }) => sendData(url, method, payload),
    onSuccess: (response) => {
      if (response.status === 200) {
        setMessage("Post added sucessfully ");
        redirect("/posts/" + response.data.post);
        handleClose(false);
        setMessage(null);
      }
      if (response.status === 500) {
        setMessage("Failed to create post");
      }
    },
    onError: () => {
      setMessage(
        "An unknown error has occured, please check your connection or try again later"
      );
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const category = catergoryRef.current.value;
    const title = titleRef.current.value;
    const content = editorRef.current.getEditorData();
    const contentLength = editorRef.current.getContentLength();
    if (!category) {
      setMessage("Please select a category");
      return;
    }
    if (title.length < 6) {
      setMessage("Please enter a longer title");
      return;
    }
    if (contentLength < 10) {
      setMessage("post too short");
      return;
    }
    const payload = { stack: category, title: title, content: content };
    postMutator.mutate({ url: "/api/posts", method: "POST", payload: payload });
  }

  return (
    <>
      {visible && (
        <div className="create-post-container">
          <div className="create-post-close-container">
            <div
              className="create-post-close"
              onClick={() => {
                setMessage(null);
                handleClose(false);
              }}
            >
              X
            </div>
          </div>
          <h3 className="create-post-title">Create a post here</h3>
          <form className="create-post-form-container">
            <div className="create-post-input-container">
              <select
                className="create-post-input"
                ref={catergoryRef}
                name="category"
              >
                <option hidden value={""}>
                  Category
                </option>
                {categories.map((category, i) => {
                  return (
                    <option
                      className="create-post-select-option"
                      key={i}
                      value={category.stack_name}
                    >
                      {category.stack_name}
                    </option>
                  );
                })}
              </select>

              <input
                className="create-post-input"
                name="title"
                placeholder="Title"
                ref={titleRef}
              ></input>
            </div>
            <div className="create-post-editor-container">
              <TiptapEditor editorRef={editorRef} />
            </div>

            <button
              className="create-post-submit-button"
              type="submit"
              onClick={handleSubmit}
            >
              Create post
            </button>
            {message}
          </form>
        </div>
      )}
    </>
  );
}
