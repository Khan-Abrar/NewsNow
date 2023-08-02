import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";

export default class App extends Component {
  pageSize = 15;
  country = "us";
  render() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route key="default" exact path="/" element={<News pageSize={this.pageSize} country={this.country} category={"general"} />} />
          <Route key="business" exact path="/business" element={<News pageSize={this.pageSize} country={this.country} category={"business"} />} />
          <Route key="entertainment" exact path="/entertainment" element={<News pageSize={this.pageSize} country={this.country} category={"entertainment"} />} />
          <Route key="general" exact path="/general" element={<News pageSize={this.pageSize} country={this.country} category={"general"} />} />
          <Route key="health" exact path="/health" element={<News pageSize={this.pageSize} country={this.country} category={"health"} />} />
          <Route key="science" exact path="/science" element={<News pageSize={this.pageSize} country={this.country} category={"science"} />} />
          <Route key="sports" exact path="/sports" element={<News pageSize={this.pageSize} country={this.country} category={"sports"} />} />
          <Route key="technology" exact path="/technology" element={<News pageSize={this.pageSize} country={this.country} category={"technology"} />} />
          <Route key="PageNotFound" exact path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </>
    );
  }
}
