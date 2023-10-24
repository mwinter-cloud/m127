import React, { Component } from 'react'
import CommentSmileBlock from "../../forms/smile-block/CommentSmileBlock"
import CommentForm from "../../forms/CommentForm"

class CommentFormBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            smiles_block: 0
        }
        this.setSmilesBlock = this.setSmilesBlock.bind(this)
        this.createCommentEvent = this.createCommentEvent.bind(this)
    }

    componentDidMount() {
        let wsProtocol = ""
        if (window.location.protocol == 'https:') {
            wsProtocol = 'wss://'
        } else {
            wsProtocol = 'ws://'
        }
        this.commentsSocket = new WebSocket(
            wsProtocol + window.location.host + '/ws/comments/' + this.props.poll_id)
        this.commentsSocket.onmessage = e => {
            let data = JSON.parse(e.data)
            this.props.addComment(data)
            let block = document.getElementById("comments_block")
            block.scrollTop = block.scrollHeight
        }
    }

    componentWillUnmount() {
        this.commentsSocket.close()
    }

    createCommentEvent = (data) => {
        this.commentsSocket.send(JSON.stringify({
            'text': data.text,
            'created_at': data.created_at,
            'name': data.author.name,
            'avatar': data.author.avatar,
            'id': data.id,
        }))
    }

    setSmilesBlock = () => {
        this.setState({smiles_block: this.state.smiles_block == 0 ? 1 : 0})
    }

    render() {
        return (
            <>
                {this.state.smiles_block ? (<CommentSmileBlock setSmilesBlock={this.setSmilesBlock}/>) : null}
                <CommentForm poll_id={this.props.poll_id} setSmilesBlock={this.setSmilesBlock}
                             createCommentEvent={this.createCommentEvent} addComment={this.props.addComment}/>
            </>
        )
    }
}

export default CommentFormBlock
