import { useEffect } from "react";
import useBackendService from "../../../hooks/useBackendService";
import Comment from "../Comment/Comment";
export default function Comments({ post }) {
  const { loading, data, error, getData } = useBackendService();
  const uri = "/api/comments?post=" + post;

  useEffect(() => {
    getData(uri);
  }, []);
  return (
    <>
      {!loading && !error && (
        <div>
          {data.data.map((comment, i) => {
            return <Comment comment={comment} key={i} />;
          })}
        </div>
      )}
    </>
  );
}
