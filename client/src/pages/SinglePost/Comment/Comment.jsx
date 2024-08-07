export default function Comment({ comment }) {
  return (
    <>
      <div>username:{comment.username}</div>
      <div>{comment.comment_content}</div>
    </>
  );
}
