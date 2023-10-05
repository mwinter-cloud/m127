import React, { Component } from 'react'
import './style/form_window.css'

class FormWindow extends Component {
    constructor(props) {
        super(props)
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
