import { useRef, useState } from "react";
import TiptapEditor from "../../../components/Editor/Editor";
import "./CreateComment.css";
import { useMutation } from "@tanstack/react-query";
import sendData from "../../../helpers/sendData";
import { toast } from "react-toastify";
export default function CreateComment({ post, onNewComment }) {
  const editorRef = useRef(null);
  const [buttonActive, setButtonActive] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const commentMutator = useMutation({
    mutationKey: "newcomment",
    mutationFn: ({ url, method, payload }) => sendData(url, method, payload),
    onSuccess: (response) => {
      console.log(response.status);
      const content = editorRef.current.getEditorData();

      const updatePayload = {
        post: post,
        content: content,
        id: response.data.comment,
      };
      console.log(updatePayload);
      onNewComment(updatePayload);

      if (response.status === 200) {
        toast.success("Comment sucessfully added");
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
      toast.warn("Comment too short");
      return;
    }
    setButtonActive(false);
    commentMutator.mutate({
      url: "/api/comments",
      method: "POST",
      payload: payload,
    });
  }

  return (
    <>
      <form className="create-comment-container">
        <div
          className="create-comment-text"
          onClick={() => {
            setEditorVisible(!editorVisible);
          }}
        >
          Create a comment:
        </div>
        <div
          className={`create-comment-editor ${
            editorVisible ? "" : "create-comment-hidden"
          }`}
        >
          <TiptapEditor ref={editorRef} />
          <button
            onClick={handleClick}
            disabled={!buttonActive}
            className="create-comment-button"
          >
            Add comment
          </button>
        </div>
      </form>
    </>
  );
}
