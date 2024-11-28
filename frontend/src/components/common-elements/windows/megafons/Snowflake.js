import React, {useEffect} from 'react'
import "../../../../../static/frontend/images/blue-flower-smile.png"

export const Snowflake = ({type}) => {
	let content1 = ""
	let content2 = ""
	let content3 = ""
	if (type == "summer") {
		content1 = (<i className={"bubble-position-1"}></i>)
		content2 = (<i className={"bubble-position-2"}></i>)
		content3 = content1
	} else if (this.props.type == "colors") {
		content1 = (
			<>
				<i className={"confetti-item confetti-item-1"}></i>
			</>
		)
		content2 = (
			<>
				<i className={"confetti-item confetti-item-2"}></i>
			</>
		)
		content3 = (
			<>
				<i className={"confetti-item confetti-item-3"}></i>
			</>
		)
	} else if (type == "winter") {
		content1 = "❄"
		content2 = content1
		content3 = content1
	} else if (type == "fish") {
		const num = Math.floor(Math.random() * 2)+1
		content1 = (<i className={"bubble-position-1"}></i>)
		content2 = (<i className={"bubble-position-2"}></i>)
		content2 = (<i className={"bubble-position-2"+num}></i>)
	} else if (type == "pink-flower") {
		content1 = "🌸"
		content2 = content1
		content3 = content1
	} else if (type == "blue-flower") {
		content1 = (<img src="../../../../../static/frontend/images/blue-flower-smile.png"/>)
		content2 = content1
		content3 = content1
	} else if (type == "cat") {
		content1 = "🍬"
		content2 = "🍭"
		content3 = "🍥"
	}
	return (
		<div className="snowflakes" aria-hidden="true">
				<div className="snowflake">
					{content1}
				</div>
				<div className="snowflake">
					{content3}
				</div>
				<div className="snowflake">
					{content2}
				</div>
				<div className="snowflake">
					{content3}
				</div>
				<div className="snowflake">
					{content2}
				</div>
				<div className="snowflake">
					{content3}
				</div>
				<div className="snowflake">
					{content2}
				</div>
				<div className="snowflake">
					{content1}
				</div>
				<div className="snowflake">
					{content2}
				</div>
				<div className="snowflake">
					{content3}
				</div>
				<div className="snowflake">
					{content1}
				</div>
				<div className="snowflake">
					{content3}
				</div>
		</div>
	)
}