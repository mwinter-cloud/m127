import React, { Component } from 'react'
import parse from "html-react-parser"
import ConfirmWindow from "../../../../common-elements/windows/ConfirmWindow"

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm_window: 0,
        }
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
    }

    openConfirmWindow = () => {
        this.setState({confirm_window:(this.state.confirm_window?0:1)})
    }

    deleteComment = () => {
        this.props.deleteComment(this.props.id)
    }

    render() {
        return (
            <>
                {this.state.confirm_window?(<ConfirmWindow confirm_function={this.deleteComment} close={this.openConfirmWindow}/>):null}
                <div className="comment-block">
                    <i className="el-icon-close" className="el-icon-remove-outline delete-btn"
                       onClick={this.openConfirmWindow}></i>
                    <img src={this.props.author_avatar} className="avatar"/>
                    <h4>
                        <span>{this.props.author_name}</span>
                        <span className="date">{this.props.created_at}</span>
                    </h4>
                    <div className="text-zone">
                        {parse(this.props.text)}
                    </div>
                </div>
            </>
        )
    }
}

export default Comment
