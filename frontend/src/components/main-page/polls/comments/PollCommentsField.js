import React, { Component } from 'react'
import axios from "axios"
import Header from "./elements/Header"
import CommentsField from "./elements/CommentsField"
import CommentFormBlock from "./elements/CommentFormBlock"
import remove_array_item from "../../../../special-functions/remove-array-item"

class PollsCommentsField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
        this.addComment = this.addComment.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
    }

    componentDidMount() {
        const set_comments = (data) => {
            this.setState({comments: data})
        }
        axios.get(window.location.origin + '/api/comments/' + this.props.poll.id).then(res => {
            const comments = res.data
            set_comments(comments)
        })
        let block = document.getElementById("comments_block")
        block.scrollTop = block.scrollHeight
    }

    addComment = (data) => {
        const comment = {
            'id': data.id,
            'text': data.text,
            'author': {
                'name': data.name,
                'avatar': data.avatar
            },
            'created_at': data.created_at
        }
        this.setState({comments: this.state.comments.concat(comment)})
    }

    deleteComment = (comment_id) => {
        const delete_comment = () => {
            const new_arr = remove_array_item(this.state.comments, comment_id)
            this.setState({comments: new_arr})
        }
        $.ajax({
                type: 'post',
                url: '/api/delete-comment',
                cache: false,
                data: {comment_id: comment_id},
                success: function () {
                    delete_comment()
                },
                error: function (xhr) {
                    console.log('При удалении комментария возникла ошибка. Попробуй позже.')
                }
            })
    }

    render() {
        return (
            <div className="comments-field">
                <Header question={this.props.poll.question} setQuestion={this.props.setQuestion}/>
                <CommentsField poll_id={this.props.poll.id} comments={this.state.comments} deleteComment={this.deleteComment}/>
                <CommentFormBlock poll_id={this.props.poll.id} addComment={this.addComment}/>
            </div>
        )
    }
}

export default PollsCommentsField
