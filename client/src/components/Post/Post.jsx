import RichTextViewer from "../RichTextViewer/RichTextViewer";
import "./Post.css";
import { Link } from "react-router-dom";
export default function PostPreview({ post }) {
  return (
    <>
      <Link to={"/posts/" + post.post_ID} className="post-container">
        <div className="post-title">{post.post_title}</div>
        <div className="post-content">
          <RichTextViewer content={post.post_content} />
        </div>
      </Link>
    </>
  );
}
