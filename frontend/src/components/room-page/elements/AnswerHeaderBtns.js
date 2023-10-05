import React, { Component } from 'react'
import ThankButton from "./ThankButton"
import ReportButton from "./ReportButton"
import WarningButton from "./WarningButton"

class AnswerHeaderBtns extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		if (this.props.member) {
			return (
				<header className="answer-header">
					<div className="btn">{this.props.answer.created_at}</div>
					<div className="header-btns">
						{this.props.member.id != this.props.answer.author.user.id ?
							(<ThankButton author_user_id={this.props.answer.author.user.id}
										  author_id={this.props.answer.author.id}
										  text={this.props.answer.text}
										  answer_id={this.props.answer.id}
										  my_profile={this.props.member.profile}/>) : null}
						{this.props.member.id != this.props.answer.author.user.id ?
							(!(this.props.member.profile.is_admin)
									? (<ReportButton violator_user_id={this.props.answer.author.user.id}
													 violator_profile_id={this.props.answer.author.id}
													 my_profile={this.props.member.profile}
													 answer_id={this.props.answer.id}/>) :
									(<WarningButton recipient_user_id={this.props.answer.author.user.id}
													recipient_profile_id={this.props.answer.author.id}
													my_profile={this.props.member.profile}
													answer_id={this.props.answer.id}/>)
							) : null}
					</div>
				</header>
			)
		} else {
			return null
		}
	}
}

export default AnswerHeaderBtns
