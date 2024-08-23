import RichTextViewer from "../../../components/RichTextViewer/RichTextViewer";
import UserProfileCard from "../../../components/UserProfileCard/UserProfileCard";
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
        <div className="comment-date">{localDate + " at " + localTime}</div>
      </section>
      <div className="comment-content-container">
        <RichTextViewer content={comment.comment_content} />
      </div>
    </>
  );
}
