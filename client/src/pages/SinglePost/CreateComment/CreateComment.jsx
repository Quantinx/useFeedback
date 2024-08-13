import { useEffect, useRef, useState } from "react";
import TiptapEditor from "../../../components/Editor/Editor";
import useBackendService from "../../../hooks/useBackendService";
import "./CreateComment.css";
export default function CreateComment({ post, onSuccess }) {
  const editorRef = useRef(null);
  const { data, loading, status, sendData } = useBackendService();
  const [message, setMessage] = useState();
  const [buttonActive, setButtonActive] = useState(true);
  function handleClick(e) {
    e.preventDefault();

    const content = editorRef.current.getEditorData();
    const contentLength = editorRef.current.getContentLength();

    const payload = { post: post, content: content };

    if (contentLength < 10) {
      setMessage("Comment too short");
      return;
    }
    setButtonActive(false);
    onSuccess(payload);
    sendData("/api/comments", "POST", payload);
  }

  useEffect(() => {
    console.log(status);
    if (status === 200) {
      setMessage("Post sucessfully added");
      setButtonActive(true);
      editorRef.current.clearEditor();
    }
  }, [loading]);

  return (
    <>
      <form className="create-comment-container">
        <div className="create-comment-text">Create a comment:</div>
        <TiptapEditor ref={editorRef} className="create-comment-editor" />
        <button onClick={handleClick} disabled={!buttonActive}>
          Add comment
        </button>
        <div>{message}</div>
      </form>
    </>
  );
}
