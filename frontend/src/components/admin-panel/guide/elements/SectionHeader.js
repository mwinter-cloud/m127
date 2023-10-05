import React, { Component } from 'react'

class SectionHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            section_name: "",
        }
        this.scrollToArticle = this.scrollToArticle.bind(this)
    }

    scrollToArticle = (e) => {
        let article_id = e.target.getAttribute('data-id')
        let article_y = document.getElementById('card' + article_id).offsetTop - 20
        window.scrollTo(0, article_y)
    }

    render() {
        return (
            <div className="guide-title">
                <h3>{this.props.section_name}</h3>
                <ul>
                    {this.props.articles.length != 0 ? (
                        this.props.articles.map((art, index) => {
                            return (
                                <li key={index} data-id={art.id} onClick={this.scrollToArticle}>{art.name}</li>
                            )
                        })
                    ) : (<p>Записи отсутствуют</p>)}
                </ul>
            </div>
        )
    }
}

export default SectionHeader
