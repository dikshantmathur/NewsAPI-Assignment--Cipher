/**
 * Created by AarKay on 16-Mar-17.
 */
import React from "react";
import "whatwg-fetch";
import _ from "lodash";
import Share from './Share.js';

export class Content extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentWillMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.source, nextProps.sourceName)
    }

    getData(sr = "abc-news-au", nm = "ABC News (AU)") {
        const url = `https://newsapi.org/v1/articles?source=${sr}&apiKey=9eb84d7b15bf4d09ba73e23c9186e8d8`;
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then((json) => {
                this.setState({
                    source: sr,
                    sourceName: nm,
                    data: json.articles
                })
            })
    }

    render() {
        let i = 0;
        let articles = _.map(this.state.data, (article) => {
            return <div key={i++} className="list-group-item ">
                <p className="col-10"><b>{article.title}</b> <br/> <span
                    className="lead">{article.description}</span>&nbsp;
                    <a href={article.url} target="_blank">Read More...</a>
                </p>
                <Share share={article.url} title={article.title} />
                <img src={article.urlToImage} className="col-2 rounded" height="100"/>
            </div>
        });
        return (
            <div className="card">
                <h2 className="card-header">{this.state.sourceName}</h2>
                <div className="list-group list-group-flush">{articles}</div>
            </div>
        );
    }
}