import { useParams } from "react-router-dom";
export default function Posts() {
  const { categoryParam } = useParams();
  return (
    <>
      <h2>{categoryParam}</h2>
      <div>post page here</div>
    </>
  );
}
