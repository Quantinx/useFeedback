import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBackendService from "../../hooks/useBackendService";
import PostPreview from "../../components/Post/Post";
import "./Posts.css";
export default function Posts() {
  const { categoryParam } = useParams();
  const { data, loading, error, getData } = useBackendService();
  const uri = "/api/posts?category=" + categoryParam;

  useEffect(() => {
    getData(uri);
  }, [categoryParam]);

  return (
    <>
      <article className="post-page-container">
        <h2 className="post-page-heading">{categoryParam}</h2>
        {!loading && !error && (
          <div>
            {data.data.map((post, i) => {
              return <PostPreview post={post} key={i} />;
            })}
          </div>
        )}
      </article>
    </>
  );
}
