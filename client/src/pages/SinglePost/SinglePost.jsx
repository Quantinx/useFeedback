import "./SinglePost.css";
import { useParams } from "react-router-dom";
import Comments from "./Comments/Comments";
import RichTextViewer from "../../components/RichTextViewer/RichTextViewer";
import { useQuery } from "@tanstack/react-query";
import getData from "../../helpers/getData";

export default function SinglePost() {
  const { postParam } = useParams();
  const postURL = "/api/posts?post=" + postParam;
  const { data, isLoading, isError } = useQuery({
    queryKey: [postURL],
    queryFn: () => getData(postURL),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 12000,
  });

  const date = !isLoading ? new Date(data.data[0]?.date_created) : undefined;
  const localTime = !isLoading
    ? date.toLocaleTimeString([], { hour12: false })
    : undefined;
  const localDate = !isLoading ? date.toLocaleDateString() : undefined;

  return (
    <>
      {!isLoading && !isError && (
        <article className="single-post-page-container">
          <h2 className="single-post-page-title">{data.data[0].post_title}</h2>
          <RichTextViewer content={data.data[0].post_content} />
          <div className="single-post-subheading">
            By {data.data[0].username} on {localDate} at {localTime}
          </div>
          <Comments post={data.data[0].post_ID} />
        </article>
      )}
    </>
  );
}
