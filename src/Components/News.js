import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    window.scrollTo(0, 0);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `NewsNow - ${Capitalize(props.category)}`;
    updateNews();
    //eslint-disable-next-line
  }, [page]);

  const handlePrevClick = async () => {
    setPage(page - 1);
    updateNews();
  };
  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  return (
    <>
      <div className="container my-2">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsNow - Top {Capitalize(props.category)} Headlines
        </h1>
        <Pagination handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} page={page} pageSize={props.pageSize} totalResults={totalResults} />
        {loading && <Spinner />}
        <div className="container main-container-news">
          <div className="row">
            {!loading &&
              article.map((card, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItem title={card.title} description={card.description} imgUrl={card.urlToImage} newsUrl={card.url ? card.url : ""} author={card.author} date={card.publishedAt} source={card.source.name} />
                  </div>
                );
              })}
          </div>
        </div>
        <Pagination handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} page={page} pageSize={props.pageSize} totalResults={totalResults} />
      </div>
    </>
  );
};
News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 15,
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
export default News;
