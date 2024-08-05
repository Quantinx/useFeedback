import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";

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
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryParam" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
