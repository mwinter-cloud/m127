import React from "react"
import TestPage from "./TestPage"
import "../styles/test.css"
import {useParams} from "react-router-dom"

function Test() {
	const {id} = useParams()
	return (
		<TestPage id={id}/>
	)
}

export default Test
