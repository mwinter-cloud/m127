import React, { Component } from 'react'
import {Link} from "react-router-dom"

class CiteMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="cite-menu">
                <li>
                    <Link to="/rooms">Комнаты</Link>
                    {this.props.active_section == 'rooms' ? <div className="line"></div> : ''}
                </li>
                <li id="polls_btn">
                    <Link to="/poll">Опросы</Link>
                    {this.props.active_section == 'polls' ? <div className="line"></div> : ''}
                </li>
            </ul>
        )
    }
}

export default CiteMenu
