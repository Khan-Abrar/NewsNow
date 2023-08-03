import React from "react";

const NewsItem = (props) => {
    const { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <div className="card-container card my-3 mx-3">
        <img
          src={imgUrl ? imgUrl : "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Ff8107759-e0fa-405e-98db-c76c5fa4f0be.jpg?source=next-opengraph&fit=scale-down&width=900"}
          className="card-img-top"
          alt="Not found"
          style={{ height: "170px" }}
        />
        <div className="card-body" style={{ height: "350px" }}>
          <h5 className="card-title mb-3">{title ? title : "no title found"}</h5>
          <span className="source-badge badge rounded-pill bg-danger">
            {source ? source : "Unknown"}
            <span className="visually-hidden">unread messages</span>
          </span>
          <p className="card-text card-body-desc mb-3">{description ? description : "No description found"}</p>
          <p className="card-text card-date">
            <small className="text-muted">
              On {new Date(date).toGMTString()} By {author ? author : "Unknown"}
            </small>
          </p>
          <div className="readMoreBtn pb-2">
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
