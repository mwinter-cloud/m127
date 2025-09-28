import React, { Component } from 'react'
import './style/megafons-page.css'
import Main from "./megafons/Main"
import {Payment} from "./megafons/Payment"
import {Info} from "./megafons/Info"
import CreateMessage_wrap from "../../../store/wraps/base/CreateMessage_wrap"

class MegafonInfoWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            section: "main"
        }
        this.setSection = this.setSection.bind(this)
    }

    setSection = (e) => {
        const type = e.target.getAttribute('data-type')
        this.setState({section: type})
    }

    render() {
        return (
            <div className="shadow">
                <div className="form-window">
                    <header><i className="el-icon-back" onClick={this.props.closeWindow}></i>
                        <i className="el-icon-info" data-type="info" onClick={this.setSection}></i>
                        <h4>Мегафоны</h4></header>
                    {(() => {
                        if (this.state.section == "main") {
                            return (<Main setSection={this.setSection}/>)
                        } else if (this.state.section == "payment") {
                            return (<Payment setSection={this.setSection}/>)
                        } else if (this.state.section == "info") {
                            return (<Info setSection={this.setSection}/>)
                        } else {
                            return (<CreateMessage_wrap setSection={this.setSection} closeWindow={this.props.closeWindow}/>)
                        }
                    })()}
                </div>
            </div>
        )
    }
}

export default MegafonInfoWindow
