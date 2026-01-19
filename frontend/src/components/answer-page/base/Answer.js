import React from "react"
import AnswerPage_wrap from "../../../store/wraps/answer-page/AnswerPage_wrap"
import {useParams} from "react-router-dom"

function Answer() {
	const {id} = useParams()
	return (
		<AnswerPage_wrap id={id}/>
	)
}

export default Answer
