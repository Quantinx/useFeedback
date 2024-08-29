import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
  return (
    <>
      <article>
        <h3>{username}</h3>
      </article>
    </>
  );
}
