import React, { Component } from 'react'

class InputWrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="inputWrapper">
                <label>{this.props.label}</label>
                <input type="text" name={this.props.field} onChange={this.props.handleChange} value={this.props.value}
                       placeholder=" = ^ᴗ^ = " id={this.props.field+"_input"}/>
            </div>
        )
    }
}

export default InputWrapper
