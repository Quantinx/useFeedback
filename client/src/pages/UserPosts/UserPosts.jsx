import { useParams } from "react-router-dom";
import getData from "../../helpers/getData";
import PostPreview from "../../components/Post/Post";
import "./UserPosts.css";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
export default function UserPosts() {
  const { username } = useParams();
  const queryURL = "/api/posts?username=" + username;
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [queryURL],
      queryFn: ({ pageParam }) => getData(queryURL + "&page=" + pageParam),
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 120000,
      getNextPageParam: (lastPage) => {
        const { currentPage, perPage, to } = lastPage.pagination;
        const hasNextPage = to >= currentPage * perPage;
        return hasNextPage ? Number(currentPage) + 1 : undefined;
      },
      getPreviousPageParam: (firstPage) => {
        const { currentPage } = firstPage.pagination;
        return currentPage > 1 ? currentPage - 1 : undefined;
      },
    });

  function handlePageChange() {
    if (!hasNextPage) {
      alert("No new page avail");
    }
    fetchNextPage();
  }
  console.log(data);
  return (
    <>
      <article className="user-post-page-container">
        <h2 className="user-post-page-heading">{username}</h2>

        {!isLoading && !isError && (
          <div>
            {data.pages.map((page, i) => {
              return (
                <div key={i}>
                  {page.data.map((post, j) => {
                    return <PostPreview post={post} key={j} />;
                  })}
                </div>
              );
            })}
          </div>
        )}
      </article>
      <button onClick={handlePageChange}>Next page</button>
    </>
  );
}
