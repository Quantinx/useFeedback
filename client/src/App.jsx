import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import SinglePost from "./pages/SinglePost/SinglePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryParam" element={<Posts />} />
          <Route path="/posts/:postParam" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
