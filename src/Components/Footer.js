import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-3 py-3 text-center text-dark bg-light">
        <div className="container">
          <span>
            All rights reserved. Copyright&#169; {new Date().getFullYear()} <strong>TextUtils</strong>
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
