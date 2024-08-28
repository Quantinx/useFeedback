import { useState, useContext } from "react";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import { UserContextProvider } from "../../../context/userContext";
import "./Comments.css";
import useModalStore from "../../../stores/modals";
import { useQuery } from "@tanstack/react-query";
import getData from "../../../helpers/getData";
export default function Comments({ post }) {
  const { userStatus } = useContext(UserContextProvider);
  const commentsURL = "/api/comments?post=" + post;
  const { data, isLoading, isError } = useQuery({
    queryKey: [commentsURL],
    queryFn: () => getData(commentsURL),
    refetchOnWindowFocus: false,
  });
  const [optimisticComment, setOptimisticComment] = useState(null);
  const { setLoginVisible } = useModalStore();

  function newComment(comment) {
    const commentData = {
      comment_content: JSON.stringify(comment.content),
      username: userStatus.data.username,
    };
    setOptimisticComment(commentData);
  }

  function handleLoginClick() {
    setLoginVisible(true);
  }
  return (
    <>
      <h3 className="comments-header">Comments</h3>
      {!isLoading && !isError && (
        <div>
          {userStatus.loggedIn ? (
            <CreateComment post={post} onSuccess={newComment} />
          ) : (
            <div className="comment-nouser-text" onClick={handleLoginClick}>
              Log in to post a comment
            </div>
          )}
          {data.data.map((comment, i) => {
            return <Comment comment={comment} key={i} />;
          })}
          {optimisticComment && <Comment comment={optimisticComment} />}
        </div>
      )}
    </>
  );
}
