import { useEffect, useState, useContext } from "react";
import useBackendService from "../../../hooks/useBackendService";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import { UserContextProvider } from "../../../context/userContext";
import "./Comments.css";

export default function Comments({ post }) {
  const { userStatus } = useContext(UserContextProvider);
  const { loading, data, error, getData } = useBackendService();
  const uri = "/api/comments?post=" + post;
  const [optimisticComment, setOptimisticComment] = useState(null);

  useEffect(() => {
    getData(uri);
  }, []);

  function newComment(comment) {
    const commentData = {
      comment_content: JSON.stringify(comment.content),
      username: userStatus.data.username,
    };
    setOptimisticComment(commentData);
  }
  return (
    <>
      <h3 className="comments-header">Comments</h3>
      {!loading && !error && (
        <div>
          {userStatus.loggedIn ? (
            <CreateComment post={post} onSuccess={newComment} />
          ) : (
            <div className="comment-nouser-text">Log in to post a comment</div>
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
