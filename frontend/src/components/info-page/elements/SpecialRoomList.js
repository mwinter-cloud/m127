import React, {useState, useEffect} from 'react'
import axios from "axios"

export const SpecialRoomList = () => {
	const [rooms, setRooms] = useState([])
	
	useEffect(() => {
        axios.get(window.location.origin + '/api/get-oficial-rooms').then(({data}) => {
            setRooms(data)
        })
	}, [])

	return (
		<>
			<h2><i className="el-icon-chat-round"></i> Специальные темы</h2>
			<ul>
				{rooms.map((room, index) => {
					return (
						<li key={index}><a href={`/room/${room.id}`} target="_blank">{room.name}</a></li>
					)
				})}
			</ul>
		</>
	)
}