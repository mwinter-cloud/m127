import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import MegafonInfoWindow from "../../../common-elements/windows/MegafonInfoWindow"

class InfoBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            announcement: "undefined",
            megafon_window: 0
        }
		this.openMegafonWindow = this.openMegafonWindow.bind(this)
    }

    openMegafonWindow = () => {
        this.setState({megafon_window: (this.state.megafon_window ? 0 : 1)})
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
                    <>
                        {this.state.megafon_window?(<MegafonInfoWindow closeWindow={this.openMegafonWindow}/>):null}
                        <div className="info-block">
                            <p>🌸 {this.state.announcement}</p>
                        </div>
                        <div className="transparent-btn">
                            <Link to="/info-page">Информация</Link>
                        </div>
                        <div className="transparent-btn" onClick={this.openMegafonWindow}>
                            Специальный канал
                        </div>
                    </>
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
