import React, { Component } from 'react'
import {Link} from "react-router-dom"

class RoomBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new: 0,
        }
    }

    componentDidMount() {
        let created_datetime
        if(this.props.room.last_answer) {
            created_datetime = this.props.room.last_answer.created_at
        } else {
            created_datetime = this.props.room.created_at
        }
		let today = new Date()
		let dd = String(today.getDate()).padStart(2, '0')
		let mm = String(today.getMonth() + 1).padStart(2, '0')
		let yyyy = today.getFullYear()
		today = dd + '.' + mm + '.' + yyyy
		if (created_datetime) {
			let created_date = created_datetime.substring(0, created_datetime.indexOf(" "));
			if (today == created_date) {
				this.setState({new: 1})
			} else {
				this.setState({new: 0})
			}
		}
    }

    render() {
        return (
            <li className="room">
                <Link to={`/room/${this.props.room.id}`}>
                    <article className="room-info">
                        <h3>{this.state.new?<div className="new-icon"></div>:null} {this.props.room.name}</h3>
                        <span className="author">{this.props.room.last_answer ?
                            this.props.room.last_answer.author.name : this.props.room.author.name}</span>
                        <span className="answers"><i
                            className="el-icon-chat-round"></i> {this.props.room.answers_count}</span>
                    </article>
                </Link>
            </li>
        )
    }
}

export default RoomBlock