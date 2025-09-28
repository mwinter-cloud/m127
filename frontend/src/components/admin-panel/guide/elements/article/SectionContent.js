import React, { Component } from 'react'
import Article_wrap from "../../../../../store/wraps/admin-panel/GuideArticle_wrap"

class SectionContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="article-list">
                {this.props.articles.map((article, index) => {
                    return (<Article_wrap article={article} key={index} setArticle={this.props.setArticle}
                    setIllustrations={this.props.setIllustrations}/>)
                })}
            </div>
        )
    }
}

export default SectionContent
