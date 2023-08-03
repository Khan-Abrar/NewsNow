import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

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
      page: 1,
      totalResults: 0,
      loading: true,
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

  fetchMoreArticles = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6f5086f76da406a9bf104638b080380&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="main-container container my-2">
          <h1 className="text-center" style={{ margin: "35px 0px" }}>
            NewsNow - Top {this.Capitalize(this.props.category)} Headlines
          </h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll className="infinite-scroll-container" dataLength={this.state.article.length} next={this.fetchMoreArticles} hasMore={this.state.article.length !== this.state.totalResults} loader={<Spinner />}>
            <div className="row">
              {this.state.article.map((card, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItem title={card.title} description={card.description} imgUrl={card.urlToImage} newsUrl={card.url ? card.url : ""} author={card.author} date={card.publishedAt} source={card.source.name} />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
