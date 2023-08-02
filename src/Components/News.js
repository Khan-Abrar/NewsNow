import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 15,
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
    document.title = `NewsNow - ${this.Capitalize(this.props.category)}`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a29ef83ff3654a16872e7e6169c0593f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <>
        <div className="container my-2">
          <h1 className="text-center" style={{ margin: "35px 0px" }}>
            NewsNow - Top {this.Capitalize(this.props.category)} Headlines
          </h1>
          <div className="container mt-4 d-flex justify-content-between">
            <button onClick={this.handlePrevClick} disabled={this.state.page <= 1} type="button" className="paginationBtn btn btn-dark mx-1">
              &larr; Previous
            </button>
            <button onClick={this.handleNextClick} disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="paginationBtn btn btn-dark mx-1">
              Next &rarr;
            </button>
          </div>
          {this.state.loading && <Spinner />}
          {/* <div className="row">
            {!this.state.loading &&
              this.state.article.map((card) => {
                return (
                  <div className="col-md-4" key={card.url}>
                    <NewsItem title={card.title} description={card.description} imgUrl={card.urlToImage} newsUrl={card.url ? card.url : ""} author={card.author} date={card.publishedAt} source={card.source.name} />
                  </div>
                );
              })}
          </div> */}
        </div>
      </>
    );
  }
}

export default News;
