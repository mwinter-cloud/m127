import React, { Component } from 'react'
import './style/full-screen-window.css'

class FullScreenWindow extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.querySelector('body').classList.add('hidden-y-scroll')
    }

    componentWillUnmount() {
        document.querySelector('body').classList.remove('hidden-y-scroll')
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
