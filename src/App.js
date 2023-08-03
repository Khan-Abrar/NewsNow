import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 15;
  country = "us";
  apiKey = process.env.REACT_APP_API_KEY_3;
  category = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <>
        <Navbar category={this.category} />
        <LoadingBar height={3} color="#f11946" progress={this.state.progress} />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="default" pageSize={this.pageSize} country={this.country} category={"general"} />} />
          {this.category.map((category, index) => {
            return (<Route key={index} exact path={`/${category}`} element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country={this.country} category={category} />} />);
          })}
          <Route exact path="*" element={<PageNotFound key="PageNotFound" />} />
        </Routes>
        <Footer />
      </>
    );
  }
}
