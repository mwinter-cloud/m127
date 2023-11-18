import React, { Component } from 'react'
import {Link} from "react-router-dom"

class RoomBlock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li className="room">
                <Link to={`/room/${this.props.room.id}`}>
                    <article className="room-info">
                        <h3>{this.props.room.name}</h3>
                        <span className="author">{this.props.room.author.name}</span>
                        <span className="answers"><i
                            className="el-icon-chat-round"></i> {this.props.room.answers_count}</span>
                    </article>
                </Link>
            </li>
        )
    }
}

export default RoomBlock