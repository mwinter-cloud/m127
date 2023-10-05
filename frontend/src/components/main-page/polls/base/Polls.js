import React from 'react'
import {useParams} from "react-router-dom"
import PollPage from "./PollPage"

function Polls(props) {
	const {id} = useParams()
	return (
		<PollPage id={id} set_section={props.set_section}/>
	)
}

export default Polls
