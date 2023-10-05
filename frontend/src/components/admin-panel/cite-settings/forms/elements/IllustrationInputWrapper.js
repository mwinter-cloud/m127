import React, { Component } from 'react'

class IllustrationInputWrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="inputWrapper">
                <label>{this.props.label}</label>
                <input type="text" name={this.props.name} onChange={this.props.handleChange} value={this.props.value}/>
                <img src={this.props.value?(this.props.value):""} className={this.props.field+"-img"}/>
            </div>
        )
    }
}

export default IllustrationInputWrapper
