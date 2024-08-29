import { useParams } from "react-router-dom";
import getData from "../../helpers/getData";
import PostPreview from "../../components/Post/Post";
import "./UserPosts.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
export default function UserPosts() {
  const { username } = useParams();
  const queryURL = "/api/posts?username=" + username;
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handlePageChange();
    }
  }, [inView]);

  function handlePageChange() {
    if (!hasNextPage) {
      return;
    }
    console.log("fetching next page");
    fetchNextPage();
  }

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
        <div ref={ref}></div>
        {isFetchingNextPage && (
          <div style={{ color: "white" }}>Loading next page</div>
        )}
      </article>
    </>
  );
}
