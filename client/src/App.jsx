import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/posts");
      const dataJSON = await res.json();
      console.log(dataJSON);
      setData(dataJSON);
    }
    getData();
  }, []);

  return (
    <>
      <Header />
      <div>Hello world</div>
      {data.data && (
        <div>
          {data.data.map((post, i) => {
            return (
              <div key={i}>
                {post.post_content}, created by userID: {post.user_ID}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
