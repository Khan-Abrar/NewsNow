import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  render() {
    const { category } = this.props;
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>NewsNow</strong>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {category.map((category) => {
                return (
                  <li className="nav-item" key={category}>
                    <Link className="nav-link" to={`/${category}`}>
                      {this.Capitalize(category)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
