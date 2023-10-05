import React, { Component } from 'react'
import {Link} from "react-router-dom"

class SearchResultBlock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="search-result-block">
                <h3>{this.props.title}</h3>
                <ul>
                    {this.props.items.map((item, index) => {
                        return (
                            <li key={index}><Link to={this.props.link+"/"+item.id} onClick={this.props.closeWindow}>{item[this.props.name_field]}</Link></li>
                        )
                    })}
                    {this.props.items.length == 0 ? (<p>совпадения не обнаружены</p>) : ""}
                    {this.props.control_item ? (
                        <li onClick={this.props.loadRooms}>
                            <i className="el-icon-circle-plus-outline"></i> Смотреть ещё
                        </li>
                    ) : null}
                </ul>
            </div>
        )
    }
}

export default SearchResultBlock
