import { useParams } from "react-router-dom";
import getData from "../../helpers/getData";
import PostPreview from "../../components/Post/Post";
import "./UserPosts.css";
import { useQuery } from "@tanstack/react-query";
export default function UserPosts() {
  const { username } = useParams();
  const queryURL = "/api/posts?username=" + username;
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryURL],
    queryFn: () => getData(queryURL),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 120000,
  });

  return (
    <>
      <article className="user-post-page-container">
        <h2 className="user-post-page-heading">{username}</h2>
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
