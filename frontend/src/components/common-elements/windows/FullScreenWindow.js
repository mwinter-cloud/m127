import React, { Component } from 'react'
import './style/full-screen-window.css'

class FullScreenWindow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="full-screen-window">
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export default FullScreenWindow
