import React, { Component } from 'react'
import Dropzone from "../inputs/Dropzone"

class FileInputWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            src: ""
        }
		this.setSrc = this.setSrc.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.src != nextProps.src) {
            this.setSrc(nextProps.src)
        }
    }

    setSrc = (val) => {
        this.setState({src: val})
    }

    render() {
        return (
            <div className="inputWrapper fileInputWrapper">
                <label>{this.props.label}</label>
                <div className="file-input-block-wrapper">
                    <Dropzone field={this.props.field} type={this.props.type} src={this.state.src} setSrc={this.setSrc}/>
                    <img src={this.state.src?this.state.src:""} className={this.props.field+"-img dropzone-img"} id={this.props.field+"_img"}/>
                </div>
            </div>
        )
    }
}

export default FileInputWrapper
