import React, { Component } from 'react'
import './style/form-window.css'

class FormWindow extends Component {
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
            <div className="shadow">
                    <div className="form-window">
                        <header><i className="el-icon-back" onClick={this.props.closeWindow}></i>
                            <h4>{this.props.title}</h4></header>
                        <main>{this.props.children}</main>
                    </div>
            </div>
        )
    }
}

export default FormWindow
