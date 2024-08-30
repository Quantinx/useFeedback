import { useState, useContext, useEffect } from "react";
import Comment from "../Comment/Comment";
import CreateComment from "../CreateComment/CreateComment";
import { UserContextProvider } from "../../../context/userContext";
import "./Comments.css";
import useModalStore from "../../../stores/modals";
import { useInfiniteQuery } from "@tanstack/react-query";
import getData from "../../../helpers/getData";
import { useInView } from "react-intersection-observer";

export default function Comments({ post }) {
  const { userStatus } = useContext(UserContextProvider);
  const commentsURL = "/api/comments?post=" + post;
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [commentsURL],
    queryFn: ({ pageParam }) => getData(commentsURL + "&page=" + pageParam),
    refetchOnWindowFocus: false,
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
  const { ref, inView } = useInView();

  const [optimisticComment, setOptimisticComment] = useState(null);
  const { setLoginVisible } = useModalStore();

  function newComment(comment) {
    const commentData = {
      comment_content: JSON.stringify(comment.content),
      username: userStatus.data.username,
    };
    setOptimisticComment(commentData);
  }

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

  function handleLoginClick() {
    setLoginVisible(true);
  }
  return (
    <>
      <h3 className="comments-header">Comments</h3>
      {!isLoading && !isError && (
        <div>
          {userStatus.loggedIn ? (
            <CreateComment post={post} onSuccess={newComment} />
          ) : (
            <div className="comment-nouser-text" onClick={handleLoginClick}>
              Log in to post a comment
            </div>
          )}
          {data.pages.map((page, i) => {
            return (
              <div key={i}>
                {page.data.map((comment, j) => {
                  return <Comment comment={comment} key={j} />;
                })}
              </div>
            );
          })}
          {optimisticComment && <Comment comment={optimisticComment} />}
          <div ref={ref}></div>
        </div>
      )}
    </>
  );
}
