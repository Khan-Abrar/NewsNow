import React from "react";

const Pagination = (props) => {
  const { page, totalResults, pageSize, handleNextClick, handlePrevClick } = props;
  return (
    <div className="container mt-4 d-flex justify-content-between">
      <button onClick={handlePrevClick} disabled={page <= 1} type="button" className="previousBtn paginationBtn btn btn-dark mx-3">
        &larr; Previous
      </button>
      <button onClick={handleNextClick} disabled={page + 1 >= Math.ceil(totalResults / pageSize)} type="button" className="nextBtn paginationBtn btn btn-dark mx-3">
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
