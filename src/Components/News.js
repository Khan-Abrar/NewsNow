import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

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
    this.props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    window.scrollTo(0, 0);
    this.props.setProgress(100);
    
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePagination = async (e) => {
    if (e.target.classList.contains("previousBtn")) {
      this.setState({ page: this.state.page - 1 }, () => this.updateNews());
    } else if (e.target.classList.contains("nextBtn")) {
      this.setState({ page: this.state.page + 1 }, () => this.updateNews());
    }
  };

  render() {
    return (
      <>
        <div className="container my-2">
          <h1 className="text-center" style={{ margin: "35px 0px" }}>
            NewsNow - Top {this.Capitalize(this.props.category)} Headlines
          </h1>
          <Pagination handlePagination={this.handlePagination} page={this.state.page} pageSize={this.props.pageSize} totalResults={this.state.totalResults} />
          {this.state.loading && <Spinner />}
          <div className="container min-h-100vh">
            <div className="row">
              {!this.state.loading &&
                this.state.article.map((card) => {
                  return (
                    <div className="col-md-4" key={card.url}>
                      <NewsItem title={card.title} description={card.description} imgUrl={card.urlToImage} newsUrl={card.url ? card.url : ""} author={card.author} date={card.publishedAt} source={card.source.name} />
                    </div>
                  );
                })}
            </div>
          </div>
          <Pagination handlePagination={this.handlePagination} page={this.state.page} pageSize={this.props.pageSize} totalResults={this.state.totalResults} />
        </div>
      </>
    );
  }
}

export default News;
