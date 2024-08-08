import RichTextViewer from "../../../components/RichTextViewer/RichTextViewer";

export default function Comment({ comment }) {
  return (
    <>
      <div>username:{comment.username}</div>
      <div>
        <RichTextViewer content={comment.comment_content} />
      </div>
    </>
  );
}
