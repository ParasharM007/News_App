import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 12,
    category: "general"
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - InsightDaily`;

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,

    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    const { country, category, pagesize } = this.props;
    const apiKey=process.env.REACT_APP_API_KEY;
    let url = `/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${this.state.page}&pagesize=${pagesize}`;

    try {
      this.setState({ 
      loading: true
     });
      let data = await fetch(url);
      let parseData = await data.json();

      if (parseData.status !== "ok") {
        throw new Error(parseData.message);
      }

      this.setState({
        articles: parseData.articles,
        totalResults: parseData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ 
        loading: false
       });
    }
  };

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))) {
      await this.setState((prevState) => ({ page: prevState.page + 1 }));
      this.fetchArticles();
    }
  };

  handlePrevClick = async () => {
    await this.setState((prevState) => ({ page: prevState.page - 1 }));
    this.fetchArticles();
  };

  render() {
    const { articles, loading, page } = this.state;
    const { category, pagesize } = this.props;

    return (
      <div>
        <div className="container my-4">
          <h1 className="text-center" style={{ margin: "35px" }}>
            InsightDaily - Top {this.capitalizeFirstLetter(category)} Headlines
          </h1>
          {loading && <Spinner />}
          <div className="row">
            {!loading && articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  ImgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author ? element.author : "unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={page <= 1}
              type="button"
              className="btn btn-secondary"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={page + 1 > Math.ceil(this.state.totalResults / pagesize)}
              type="button"
              className="btn btn-secondary"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
