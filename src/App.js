import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 15;
  const country = "us";
  const apiKey = process.env.REACT_APP_API_KEY_4;
  const category = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Navbar category={category} />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="default" pageSize={pageSize} country={country} category={"general"} />} />
        {category.map((category, index) => {
          return <Route key={index} exact path={`/${category}`} element={<News key={index} setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category={category} />} />;
        })}
        <Route exact path="*" element={<PageNotFound key="PageNotFound" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
