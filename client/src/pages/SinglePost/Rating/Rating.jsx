import "./Rating.css";
import { useMutation } from "@tanstack/react-query";
import sendData from "../../../helpers/sendData";
import { useState } from "react";

export default function Rating({ currentRating, userRating, commment }) {
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
    if (!buttonEnabled) {
      return;
    }
    setButtonEnabled(false);

    setCurrentUserRating(rating);
    const newRating = calculateOptimisticRating(rating, type);
    setCommentRating(newRating);

    const payload = { comment: commment, rating: rating };
    ratingMutator.mutate({
      url: "/api/comments/rating",
      method: "POST",
      payload: payload,
    });
  }

  function handleSuccess(response) {
    console.log(response);
    setButtonEnabled(true);
  }

  function calculateOptimisticRating(change, type) {
    if (change === userRating) {
      return userRating;
    }

    if (change === 0 && type === "down") {
      return Number(userRating - 1);
    }

    if (change === -1 && type === "down" && userRating === 0) {
      return Number(userRating) - 1;
    }

    if (change === -1 && type === "down") {
      return Number(userRating) - 2;
    }

    return change === 0
      ? Number(currentUserRating) - 1
      : Number(currentUserRating) + change;
  }

  return (
    <>
      <div className="rating-container">
        {currentUserRating === 1 ? (
          <img
            src="/icons/thumbs-up-solid.svg"
            width={size}
            height={size}
            onClick={() => {
              handleClick(0, "up");
            }}
          />
        ) : (
          <img
            src="/icons/thumbs-up-regular.svg"
            width={size}
            height={size}
            onClick={() => handleClick(1, "up")}
          />
        )}
        <div>{commentRating}</div>
        {currentUserRating === -1 ? (
          <img
            src="/icons/thumbs-down-solid.svg"
            width={size}
            height={size}
            onClick={() => {
              handleClick(0, "down");
            }}
          />
        ) : (
          <img
            src="/icons/thumbs-down-regular.svg"
            width={size}
            height={size}
            onClick={() => handleClick(-1, "down")}
          />
        )}
      </div>
    </>
  );
}
