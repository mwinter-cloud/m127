import React from "react"
import RoomPage_wrap from "../../../store/wraps/room-page/RoomPage_wrap"
import "../styles/room.css"
import {useParams} from "react-router-dom"

function Room() {
	const {id} = useParams()
	return (
		<RoomPage_wrap id={id}/>
	)
}

export default Room
