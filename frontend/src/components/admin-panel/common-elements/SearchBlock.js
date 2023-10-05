import React, { Component } from 'react'

class SearchBlock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="search-block">
                <input placeholder="Искать по названию" onInput={this.props.onSearch}/>
                <button><i className="el-icon-search"></i></button>
            </div>
        )
    }
}

export default SearchBlock
