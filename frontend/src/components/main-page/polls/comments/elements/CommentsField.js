import React, { Component } from 'react'
import Comment from "./Comment";

class CommentsField extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="comments-block" id="comments_block">
                {this.props.comments.map((comment, index) => {
                    return (
                        <Comment key={index} id={comment.id} text={comment.text}
                                 author_avatar={comment.author.avatar} author_name={comment.author.name}
                                 created_at={comment.created_at} deleteComment={this.props.deleteComment}/>
                    )
                })}
            </div>
        )
    }
}

export default CommentsField
