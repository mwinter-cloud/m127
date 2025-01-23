import React, {Component} from "react"
import QuoteButton from "./QuoteButton"
import AppealButton from "./AppealButton"
import ConfirmWindow from "../../common-elements/windows/ConfirmWindow"

class AnswerBtns extends Component {
	constructor(props) {
		super(props)
		this.state = {
			delete_confirm_window_status: 'disabled',
		}
		this.deleteAnswer = this.deleteAnswer.bind(this)
		this.changeDeleteConfirmWindowStatus = this.changeDeleteConfirmWindowStatus.bind(this)
	}

	changeDeleteConfirmWindowStatus = () => {
		this.setState({delete_confirm_window_status: (this.state.delete_confirm_window_status == 'active' ? 'disabled' : 'active')})
	}

	deleteAnswer = () => {
		const answer_id = this.props.answer.id
		const remove_answer = () => {
			document.getElementById('answer' + answer_id).classList.add('hide')
			this.changeDeleteConfirmWindowStatus()
		}
		$.ajax({
			type: 'post',
			url: window.location.origin + '/api/delete-answer',
			cache: false,
			data: {answer_id: answer_id},
			success: function (result) {
				if (result) {
					remove_answer()
				}
			},
			error: function (xhr, status, error) {
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}

	openEditForm = () => {
		this.setState({edit_status: (this.state.edit_status ? 0 : 1)})
	}

	render() {
		if (this.props.member) {
			return (
				<>
					{this.state.delete_confirm_window_status == 'active' && (
						<ConfirmWindow confirmFunc={this.deleteAnswer} close={this.changeDeleteConfirmWindowStatus} />)}
					<div className="answer-btns">
						{this.props.member.id == this.props.answer.author.user.id ?
							(<>
								<div className="btn" onClick={this.props.openEditForm}><i
									className="el-icon-edit"></i></div>
								<div className="btn" onClick={this.changeDeleteConfirmWindowStatus}><i
									className="el-icon-delete"></i></div>
							</>) : (
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
				</>
			)
		} else {
			return null
		}
	}
}

export default AnswerBtns
