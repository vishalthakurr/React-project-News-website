import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
// import NewApi from './NewApi.json'

import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {



    static defaultProps = {
        country: " in",
        page: 8,
        category: "general"

    }

    static propTypes = {
        country: PropTypes.string,
        page: PropTypes.number,
        category: PropTypes.string,
    }


    articles = []
    cap = (s) => { return s.charAt(0).toUpperCase() + s.slice(1); };

    constructor(props) {
        super(props);

        // console.log("comst");                                    //call 1
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            bg: "badge bg-primary",
            totalResults: 0

        }
        document.title = ` ${this.cap(this.props.category)}  - NewsPanda`;
    }


    async upadate() {
        this.props.setProgress(10);
        const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedata = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })

        this.props.setProgress(100);


    }

    async componentDidMount() {                                     //call3
        // console.log("api")
        // let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a505232f817d471e8a4a7776c1d652f8&page=1&pageSize=${this.props.pagesize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedata = await data.json();
        // this.setState({
        //     articles: parsedata.articles,
        //     totalResults: parsedata.totalResults,
        //     loading: false
        //})
        this.upadate();
    }

    hendelnext = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a505232f817d471e8a4a7776c1d652f8&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
        //     this.setState({ loading: true })
        //     let data = await fetch(url);
        //     let parsedata = await data.json();

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedata.articles,
        //         loading: false
        //     })

        // }
        this.setState({ page: this.state.page + 1 })
        this.upadate();
    }
    hendlepre = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a505232f817d471e8a4a7776c1d652f8&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedata = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedata.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 })
        this.upadate();
    }

      fetchMoreData = async () => {

          const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
          this.setState({ page: this.state.page + 1 })
        // this.setState({ loading: true })
        let data = await fetch(url); 
        let parsedata = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults,
            
        })
    };




    render() {
        // console.log("render")                                 //call2      //call4
        return (

            <>

            <h1 className="mb-3 text-center" style={{marginTop: "90px"}}> Newspanda - Top {this.cap(this.props.category)} Headline</h1>
            {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}

                >
                    <div className="container">

                        <div className="row">
                            {  /* !this.state.loading && */ this.state.articles.map((element) => {

                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""} myurl={element.urlToImage} newurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                                        bg={
                                            this.props.category === "sports" ? "badge bg-danger" : this.state.bg
                                                && this.props.category === "technology" ? "badge bg-warning" : this.state.bg
                                                    && this.props.category === "science" ? "badge bg-success" : this.state.bg
                                                        && this.props.category === "health" ? "badge bg-danger" : this.state.bg
                                                            && this.props.category === "business" ? "badge bg-secondary" : this.state.bg
                                                                && this.props.category === "general" ? "badge bg-info" : this.state.bg
                                        } />
                                </div>

                            })}

                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.hendlepre}> &larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))} type="button" className="btn btn-dark" onClick={this.hendelnext}>Next &rarr; </button>
                </div> */}
                </>
            
        )
    }
}

export default News
