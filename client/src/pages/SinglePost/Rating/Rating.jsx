import "./Rating.css";
import { useMutation } from "@tanstack/react-query";
import sendData from "../../../helpers/sendData";
import { useState, useContext } from "react";
import { UserContextProvider } from "../../../context/userContext";
import { toast } from "react-toastify";
export default function Rating({ currentRating, userRating, commment }) {
  const { userStatus } = useContext(UserContextProvider);

  const [currentUserRating, setCurrentUserRating] = useState(userRating);
  const [commentRating, setCommentRating] = useState(currentRating);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const size = 30;
  const ratingMutator = useMutation({
    mutationKey: "rating" + commment,
    mutationFn: ({ url, method, payload }) => sendData(url, method, payload),
    onSuccess: (response) => {
      handleSuccess(response);
    },
  });

  function handleClick(rating, type) {
    if (!userStatus.loggedIn) {
      toast.info("Please log in to rate a comment");
      return;
    }

    if (!buttonEnabled) {
      toast.warn("Please wait...");
      return;
    }
    setButtonEnabled(false);

    const newRating = calculateOptimisticRating(rating, type);
    setCurrentUserRating(rating);
    setCommentRating(newRating);

    const payload = { comment: commment, rating: rating };
    ratingMutator.mutate({
      url: "/api/comments/rating",
      method: "POST",
      payload: payload,
    });
  }

  function handleSuccess(response) {
    setButtonEnabled(true);
  }

  function calculateOptimisticRating(change, type) {
    if (change === 1 && currentUserRating === -1) {
      return Number(commentRating) + 2;
    }

    if (change === 1 && type === "up") {
      return Number(commentRating) + 1;
    }

    if (change === 0 && type === "up") {
      return Number(commentRating) - 1;
    }

    if (change === -1 && currentUserRating === 1) {
      return Number(commentRating) - 2;
    }

    if (change === -1) {
      return Number(commentRating) - 1;
    }

    if (change === 0 && type === "down") {
      return Number(commentRating) + 1;
    }
  }

  return (
    <>
      <div className="rating-container">
        {currentUserRating === 1 ? (
          <img
            src="/icons/thumbs-up-solid.svg"
            className="rating-icon"
            width={size}
            height={size}
            onClick={() => {
              handleClick(0, "up");
            }}
          />
        ) : (
          <img
            src="/icons/thumbs-up-regular.svg"
            className="rating-icon"
            width={size}
            height={size}
            onClick={() => handleClick(1, "up")}
          />
        )}
        <div className="rating-text">{commentRating}</div>
        {currentUserRating === -1 ? (
          <img
            src="/icons/thumbs-down-solid.svg"
            className="rating-icon"
            width={size}
            height={size}
            onClick={() => {
              handleClick(0, "down");
            }}
          />
        ) : (
          <img
            src="/icons/thumbs-down-regular.svg"
            className="rating-icon"
            width={size}
            height={size}
            onClick={() => handleClick(-1, "down")}
          />
        )}
      </div>
    </>
  );
}
