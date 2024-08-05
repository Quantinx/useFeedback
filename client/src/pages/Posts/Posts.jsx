import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBackendService from "../../hooks/useBackendService";
import PostPreview from "../../components/Post/Post";
export default function Posts() {
  const { categoryParam } = useParams();
  const { data, loading, error, getData } = useBackendService();
  const uri = "/api/posts?category=" + categoryParam;

  useEffect(() => {
    getData(uri);
  }, [categoryParam]);

  return (
    <>
      <h2>{categoryParam}</h2>
      <div>post page here</div>
      {!loading && !error && (
        <div>
          {data.data.map((post, i) => {
            return <PostPreview post={post} key={i} />;
          })}
        </div>
      )}
    </>
  );
}
