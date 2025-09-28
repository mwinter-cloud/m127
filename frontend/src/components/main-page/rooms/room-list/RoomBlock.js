import React, {useState, useEffect, useRef} from 'react';
import {Link} from "react-router-dom"

export const RoomBlock = ({room}) => {
	const [newAnswerIcon, setNewAnswerIcon] = useState(0)
	
	useEffect(() => {
		checkNewAnswers(room)
	}, [room])
	
	const checkNewAnswers = (room) => {
		let created_datetime
        if(room.last_answer) {
            created_datetime = room.last_answer.created_at
        } else {
            created_datetime = room.created_at
        }
		let today = new Date()
		let dd = String(today.getDate()).padStart(2, '0')
		let mm = String(today.getMonth() + 1).padStart(2, '0')
		let yyyy = today.getFullYear()
		today = dd + '.' + mm + '.' + yyyy
		if (created_datetime) {
			let created_date = created_datetime.substring(0, created_datetime.indexOf(" "))
			if (today == created_date) {
				setNewAnswerIcon('new-icon')
			}
		} else {
			setNewAnswerIcon('null')
		}
	}

	return (
		<li className="room">
			<Link to={`/room/${room.id}`}>
				<article className="room-info">
					<h3><div className={newAnswerIcon}></div> {room.name}</h3>
					<span className="author">{room.last_answer ?
						room.last_answer.author.name : room.author.name}</span>
					<span className="answers"><i
						className="el-icon-chat-round"></i> {room.answers_count}</span>
				</article>
			</Link>
		</li>
	)
}