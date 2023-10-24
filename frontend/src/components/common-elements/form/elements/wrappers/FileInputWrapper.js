import React, { Component } from 'react'
import Dropzone from "../inputs/Dropzone"

class FileInputWrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="inputWrapper fileInputWrapper">
                <label>{this.props.label}</label>
                <div className="file-input-block-wrapper">
                    <Dropzone field={this.props.field} type={this.props.type}/>
                    <img src={this.props.src?this.props.src:""} className={this.props.field+"-img dropzone-img"} id={this.props.field+"_img"}/>
                </div>
            </div>
        )
    }
}

export default FileInputWrapper
