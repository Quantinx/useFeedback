import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import SinglePost from "./pages/SinglePost/SinglePost";
import queryClient from "./query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:categoryParam" element={<Posts />} />
            <Route path="/posts/:postParam" element={<SinglePost />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
