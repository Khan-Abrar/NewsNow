import React, { Component } from "react";

export class Pagination extends Component {
  render() {
    const {page, totalResults, pageSize, handlePagination} = this.props;
    return (
      <div className="container mt-4 d-flex justify-content-between">
        <button onClick={handlePagination} disabled={page <= 1} type="button" className="previousBtn paginationBtn btn btn-dark mx-3">
          &larr; Previous
        </button>
        <button onClick={handlePagination} disabled={page + 1 >= Math.ceil(totalResults / pageSize)} type="button" className="nextBtn paginationBtn btn btn-dark mx-3">
          Next &rarr;
        </button>
      </div>
    );
  }
}

export default Pagination;
