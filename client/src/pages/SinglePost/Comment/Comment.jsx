import RichTextViewer from "../../../components/RichTextViewer/RichTextViewer";
import UserProfileCard from "../../../components/UserProfileCard/UserProfileCard";
import Rating from "../Rating/Rating";
import "./Comment.css";
export default function Comment({ comment }) {
  const date = new Date(comment.date_created);
  const localTime = date.toLocaleTimeString([], { hour12: false });
  const localDate = date.toLocaleDateString();

  return (
    <>
      <section className="comment-title-container">
        <div className="comment-username">
          <UserProfileCard
            username={comment.username}
            profilePicture={comment.profile_picture}
          />
        </div>
        <div>
          <Rating
            userRating={comment.user_rating}
            currentRating={comment.total_rating}
            commment={comment.comment_ID}
          />
          <div className="comment-date">{localDate + " at " + localTime}</div>
        </div>
      </section>
      <div className="comment-content-container">
        <RichTextViewer content={comment.comment_content} />
      </div>
    </>
  );
}
