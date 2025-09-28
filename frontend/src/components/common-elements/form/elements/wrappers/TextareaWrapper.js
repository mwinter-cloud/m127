import React, { Component } from 'react'

class TextareaWrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="inputWrapper">
                <label>{this.props.label}</label>
                <textarea type="text" name={this.props.field} onChange={this.props.handleChange} value={this.props.value}>
                </textarea>
            </div>
        )
    }
}

export default TextareaWrapper
