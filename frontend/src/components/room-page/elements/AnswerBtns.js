import React, { Component } from 'react'
import QuoteButton from "./QuoteButton"
import AppealButton from "./AppealButton"

class AnswerBtns extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		if (this.props.member) {
			return (
				<div className="answer-btns">
					{this.props.member.id == this.props.answer.author.user.id ?
						(<div className="btn" onClick={this.props.openEditForm}><i
							className="el-icon-edit"></i></div>) : (
							<>
								<QuoteButton id={this.props.answer.author.user ?
									this.props.answer.author.user.id : null}
									color={this.props.answer.author.color}
									text={this.props.answer.text}
									name={this.props.answer.author.name}/>
								<AppealButton id={this.props.answer.id ?
									this.props.answer.author.user.id : null}
									color={this.props.answer.author.color}
									name={this.props.answer.author.name}
									answer_id={this.props.answer.id}
								/>
							</>
						)}
				</div>
			)
		} else {
			return null
		}
	}
}

export default AnswerBtns
