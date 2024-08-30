import { useParams } from "react-router-dom";
import getData from "../../helpers/getData";
import PostPreview from "../../components/Post/Post";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import "./Posts.css";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
export default function Posts() {
  const { categoryParam } = useParams();
  const queryURL = "/api/posts?category=" + categoryParam;
  const { ref, inView } = useInView();

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
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 120000,
    initialPageParam: 1,
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

  useEffect(() => {
    if (inView) {
      handlePageChange();
    }
  }, [inView]);

  function handlePageChange() {
    if (!hasNextPage) {
      return;
    }

    fetchNextPage();
  }

  return (
    <>
      <article className="post-page-container">
        <h2 className="post-page-heading">{categoryParam}</h2>
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
            <div ref={ref}></div>
          </div>
        )}
      </article>
    </>
  );
}
