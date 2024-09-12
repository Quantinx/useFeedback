import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import SinglePost from "./pages/SinglePost/SinglePost";
import queryClient from "./query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/userContext.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import UserPosts from "./pages/UserPosts/UserPosts.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <ToastContainer theme="dark" position="bottom-center" limit={5} />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories/:categoryParam" element={<Posts />} />
              <Route path="/posts/:postParam" element={<SinglePost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users/:username" element={<UserProfile />} />
              <Route path="/users/:username/posts" element={<UserPosts />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
