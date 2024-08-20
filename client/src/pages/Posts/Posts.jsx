import { useParams } from "react-router-dom";
import getData from "../../helpers/getData";
import PostPreview from "../../components/Post/Post";
import "./Posts.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
export default function Posts() {
  const { categoryParam } = useParams();
  const queryURL = "/api/posts?category=" + categoryParam;
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryURL],
    queryFn: () => getData(queryURL),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 120000,
  });

  return (
    <>
      <article className="post-page-container">
        <h2 className="post-page-heading">{categoryParam}</h2>
        {!isLoading && !isError && (
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
