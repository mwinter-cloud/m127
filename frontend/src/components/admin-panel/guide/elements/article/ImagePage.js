import React, { Component } from 'react'
import ConfirmWindow from "../../../../common-elements/windows/ConfirmWindow"

class ImagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'confirm_window': 0,
        }
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.removeImage = this.removeImage.bind(this)
    }

    openConfirmWindow = () => {
        this.setState({confirm_window:(this.state.confirm_window?0:1)})
    }

    removeImage = () => {
        const id = this.props.image.id
        const remove_image = () => {this.props.removeImage(id)}
        $.ajax({
            type: 'post',
            url: '/api/remove-article-image',
            data: {id: id},
            success: function () {
                remove_image()
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    render() {
        return (
            <div className="illustration-page">
                {this.state.confirm_window?(<ConfirmWindow confirm_function={this.removeImage} close={this.openConfirmWindow}/>):""}
                <div className="col1">
                    <span onClick={this.props.closeWindow}><i className="el-icon-back"></i></span>
                    <h3 className="article-name">{this.props.article_title}</h3>
                </div>
                <div className="col2">
                    <p className="description">{this.props.image.description}</p>
                    <span className="text-btn" onClick={this.openConfirmWindow}><i className="el-icon-delete"></i> удалить</span>
                    <img src={this.props.image.file} className="illustration-image"/>
                </div>
            </div>
        )
    }
}

export default ImagePage
