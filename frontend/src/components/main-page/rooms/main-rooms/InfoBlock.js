import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

class InfoBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            announcement: "undefined"
        }
    }

    componentDidMount() {
        axios.get('/api/get-announcement').then(res => {
            const text = res.data.text
            this.setState({announcement: text})
        })
    }

    render() {
        if (this.state.announcement != "undefined") {
            if (this.state.announcement) {
                return (
                    <div className="info-block">
                        <p>{this.state.announcement}</p>
                        <div className="transparent-btn">
                            <Link to="/info-page"><i className="el-icon-info"></i> Информация</Link>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="transparent-btn alone-info-btn">
                        <Link to="/info-page"><i className="el-icon-info"></i> Информация</Link>
                    </div>
                )
            }
        }
    }
}

export default InfoBlock
