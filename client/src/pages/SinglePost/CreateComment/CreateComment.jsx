import { useRef, useState } from "react";
import TiptapEditor from "../../../components/Editor/Editor";
import "./CreateComment.css";
import { useMutation } from "@tanstack/react-query";
import sendData from "../../../helpers/sendData";
export default function CreateComment({ post, onSuccess }) {
  const editorRef = useRef(null);
  const [message, setMessage] = useState();
  const [buttonActive, setButtonActive] = useState(true);
  const commentMutator = useMutation({
    mutationKey: "newcomment",
    mutationFn: ({ url, method, payload }) => sendData(url, method, payload),
    onSuccess: (response) => {
      console.log(response.status);
      if (response.status === 200) {
        setMessage("Post sucessfully added");
        setButtonActive(true);
        editorRef.current.clearEditor();
      }
    },
  });
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
    commentMutator.mutate({
      url: "/api/comments",
      method: "POST",
      payload: payload,
    });
  }

  return (
    <>
      <form className="create-comment-container">
        <div className="create-comment-text">Create a comment:</div>
        <TiptapEditor ref={editorRef} className="create-comment-editor" />
        <button
          onClick={handleClick}
          disabled={!buttonActive}
          className="create-comment-button"
        >
          Add comment
        </button>
        <div>{message}</div>
      </form>
    </>
  );
}
