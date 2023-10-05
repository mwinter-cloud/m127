import React, { Component } from 'react'

class SearchBlock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="section-search-block">
                <i className="el-icon-search icon"></i>
                <input className="section-search" placeholder="Что ищем?" onInput={this.props.onSearch}/>
            </div>
        )
    }
}

export default SearchBlock
