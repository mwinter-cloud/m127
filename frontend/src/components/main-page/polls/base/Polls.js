import React from 'react'
import {useParams} from "react-router-dom"
import PollsPage from "./PollsPage"

function Polls({set_section}) {
	const {id} = useParams()
	return (
		<PollsPage id={id} setSection={set_section}/>
	)
}

export default Polls
