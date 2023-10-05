import React, { Component } from 'react'
import './style/small-window.css'

class SmallWindow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="shadow">
                <div className="small-window">
                    <header className="small-window-header">
                            <h4>{this.props.title}</h4>
                            <i className="el-icon-close close-btn" onClick={this.props.closeWindow}></i>
                    </header>
                    <main>{this.props.children}</main>
                </div>
            </div>
        )
    }
}

export default SmallWindow
