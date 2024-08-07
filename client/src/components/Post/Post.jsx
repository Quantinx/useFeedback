import RichTextViewer from "../RichTextViewer/RichTextViewer";
import "./Post.css";
import { Link } from "react-router-dom";
export default function PostPreview({ post }) {
  return (
    <>
      <Link to={"/posts/" + post.post_ID}>
        <div>{post.post_title}</div>
        <div>
          <RichTextViewer content={post.post_content} />
        </div>
      </Link>
    </>
  );
}
