import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, myurl, newurl, author, date, source, bg } = this.props
        return (
            <div className="container my-3">
                <div className="card"  >
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: "0"
                    }}>
                        <span className={` badge rounded-pill ${bg}`} style={{ left: '90%', zIndex: '1' }}>
                            {source}

                        </span>


                    </div>

                    <img src={myurl} className="card-img-top" alt="error" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...



                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text "> <small className="text-muted">By {!author ? "unknown" : author}  on {new Date(date).toGMTString()} </small></p>
                        <a href={newurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
