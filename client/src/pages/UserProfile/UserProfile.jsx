import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getData from "../../helpers/getData";
import "./UserProfile.css";
export default function UserProfile() {
  const { username } = useParams();
  const profileUrl = "/api/users/profile/" + username;

  const { data, isLoading, isError } = useQuery({
    queryKey: [profileUrl],
    queryFn: () => getData(profileUrl),
  });
  return (
    <>
      {!isLoading && data && (
        <div className="user-profile-page-wrapper">
          <article className="user-profile-page-container">
            <div className="user-profle-page-text">
              Username: {data.username}
            </div>
            <div className="user-profle-page-text">
              Full name: {data.full_name}
            </div>
            <img src={data.profile_picture} width={300} height={300} />

            <div className="user-profile-page-profile-content">
              {data.profile_content}
            </div>

            <Link
              className="user-profile-page-link"
              to={"/users/" + username + "/posts"}
            >
              View Posts
            </Link>
          </article>
        </div>
      )}
    </>
  );
}
