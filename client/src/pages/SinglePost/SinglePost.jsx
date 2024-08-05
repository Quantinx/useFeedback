import "./SinglePost.css";
import useBackendService from "../../hooks/useBackendService";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Comments from "./Comments/Comments";

export default function SinglePost() {
  const { postParam } = useParams();
  const { data, loading, error, getData } = useBackendService();
  const uri = "/api/posts?post=" + postParam;
  useEffect(() => {
    getData(uri);
  }, [postParam]);

  return (
    <>
      {!loading && !error && (
        <article>
          <h2>{data.data[0].post_title}</h2>
          <div>{data.data[0].post_content}</div>
          <Comments post={data.data[0].post_ID} />
        </article>
      )}
    </>
  );
}