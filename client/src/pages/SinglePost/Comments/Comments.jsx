import { useEffect, useState, useContext } from "react";
import useBackendService from "../../../hooks/useBackendService";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import { UserContextProvider } from "../../../context/userContext";

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
      {!loading && !error && (
        <div>
          <CreateComment post={post} onSuccess={newComment} />
          {data.data.map((comment, i) => {
            return <Comment comment={comment} key={i} />;
          })}
          {optimisticComment && <Comment comment={optimisticComment} />}
        </div>
      )}
    </>
  );
}
