import React, { Component } from 'react'
import {Link} from "react-router-dom"

class ToAdmin extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.member.profile.is_admin) {
            return (
                <Link to="/admin-panel/cite-settings">
                    <div className="admin-panel-link">
                        <i className="el-icon-star-off icon"></i>
                        <span>Администрирование</span>
                        <i className="el-icon-arrow-right arrow"></i>
                    </div>
                </Link>
            )
        } else {
            return null
        }
    }
}

export default ToAdmin
