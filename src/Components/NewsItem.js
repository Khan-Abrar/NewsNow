import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    const { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card my-3 mx-3">
        <img
          src={imgUrl ? imgUrl : "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Ff8107759-e0fa-405e-98db-c76c5fa4f0be.jpg?source=next-opengraph&fit=scale-down&width=900"}
          className="card-img-top"
          alt="Not found"
          style={{ height: "170px" }}
        />
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:"1"}}>
          {source?source:"Unknown"}
          <span class="visually-hidden">unread messages</span>
        </span>
        <div className="card-body" style={{ height: "250px" }}>
          <h5 className="card-title mb-3">{title ? title : "no title found"}</h5>
          <p className="card-text mb-3">{description ? description : "No description found"}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <div className="readMorBtn pb-2">
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
