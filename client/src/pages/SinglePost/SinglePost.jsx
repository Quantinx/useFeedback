import "./SinglePost.css";
import useBackendService from "../../hooks/useBackendService";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Comments from "./Comments/Comments";
import RichTextViewer from "../../components/RichTextViewer/RichTextViewer";

export default function SinglePost() {
  const { postParam } = useParams();
  const { data, loading, error, getData } = useBackendService();
  const uri = "/api/posts?post=" + postParam;
  useEffect(() => {
    getData(uri);
  }, [postParam]);

  const date = !loading ? new Date(data.data[0]?.date_created) : undefined;
  const localTime = !loading
    ? date.toLocaleTimeString([], { hour12: false })
    : undefined;
  const localDate = !loading ? date.toLocaleDateString() : undefined;

  return (
    <>
      {!loading && !error && (
        <article className="single-post-page-container">
          <h2 className="single-post-page-title">{data.data[0].post_title}</h2>
          <RichTextViewer content={data.data[0].post_content} />
          <div className="single-post-subheading">
            By {data.data[0].username} on {localDate} at {localTime}
          </div>
          <Comments post={data.data[0].post_ID} />
        </article>
      )}
    </>
  );
}
