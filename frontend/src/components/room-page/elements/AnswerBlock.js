import React, { Component } from 'react'
import FullScreenWindow from "../../common-elements/windows/FullScreenWindow"
import Profile from "../../member/profile/Profile"
import AnswerForm from "../forms/AnswerForm"
import parse from "html-react-parser"
import {specialtagstohtml, transformationforshow} from "../../common-elements/form/elements/editor/TextEditor"
import AnswerBtns_wrap from "../../../store/wraps/room-page/AnswerBtns_wrap"
import AnswerHeaderBtns_wrap from "../../../store/wraps/room-page/AnswerHeaderBtns"
import MediaQuery from 'react-responsive'
import ConfirmWindow from "../../common-elements/windows/ConfirmWindow"
import HiddenAnswer from "./HiddenAnswer"

class AnswerBlock extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile_window: 0,
			edit_status: 0,
			confirm_window: 0,
			text: "",
		}
		this.openConfirmWindow = this.openConfirmWindow.bind(this)
		this.openProfile = this.openProfile.bind(this)
		this.openEditForm = this.openEditForm.bind(this)
		this.setAnswer = this.setAnswer.bind(this)
		this.deleteAnswer = this.deleteAnswer.bind(this)
	}

	componentDidMount() {
		if (this.props.answer != undefined) {
			this.setState({text: this.props.answer.text})
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.answer.text != this.props.answer.text) {
			//когда получим текст, установим его в state, чтобы потом могли менять при редактировании
			this.setState({text: nextProps.answer.text})
		}
	}

	openProfile = () => {
		this.setState({profile_window: (this.state.profile_window ? 0 : 1)})
	}

	openEditForm = () => {
		this.setState({edit_status: (this.state.edit_status ? 0 : 1)})
	}

	setAnswer = (data) => {
		this.openEditForm()
		this.setState({text: data})
	}

	openConfirmWindow = () => {
		this.setState({confirm_window: (this.state.confirm_window ? 0 : 1)})
	}

	deleteAnswer = () => {
		const answer_id = this.props.answer.id
		const remove_answer = () => {
			document.getElementById('answer' + answer_id).classList.add('hide')
			this.openConfirmWindow()
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

	render() {
		if (this.props.answer.author) {
			if (this.props.answer.author.user) {
				if (this.props.answer.type != 2) {
					return (
						<>
							{this.state.profile_window ? (
								<FullScreenWindow
									children={<Profile id={this.props.answer.author.id}
													   closeWindow={this.openProfile}/>}/>) : null}
							{(() => {
								if (this.state.edit_status == 0) {
									return (
										<section className="answer" id={"answer" + this.props.answer.id}>
											<MediaQuery maxWidth={800}>
												<AnswerHeaderBtns_wrap answer={this.props.answer}/>
											</MediaQuery>
											<div className="author">
												{this.props.answer.author.avatar != null ?
													(<img src={this.props.answer.author.avatar} className="avatar"/>)
													: (<div className="avatar base-avatar"></div>)}
												<div className="author-info"
													 onClick={this.openProfile}>
										<span
											className={this.props.answer.author.color ? this.props.answer.author.color.type : null}>
											{this.props.answer.author.name}</span>
												</div>
											</div>
											<div className="text">
												<MediaQuery minWidth={801}>
													<AnswerHeaderBtns_wrap answer={this.props.answer}/>
												</MediaQuery>
												<div
													className="answer-text">{this.state.text ?
													(parse(transformationforshow(specialtagstohtml(this.state.text)))) : null}
												</div>
												<AnswerBtns_wrap answer={this.props.answer}
																 openEditForm={this.openEditForm}/>
											</div>
										</section>
									)
								} else {
									return (
										<>
											{this.state.confirm_window ? (
												<ConfirmWindow confirm_function={this.deleteAnswer}
															   close={this.openConfirmWindow}/>) : null}
											<section className="answer" id={"answer" + this.props.answer.id}>
												<div className="author">
													{this.props.answer.author.avatar ?
														(<img src={this.props.answer.author.avatar}
															  className="avatar"/>)
														: null}
													<div className="author-info"
														 onClick={this.openProfile}>
												<span
													className={this.props.answer.author.color ? this.props.answer.author.color.type : null}>
													{this.props.answer.author.name}
												</span>
													</div>
												</div>
												<div className="text">
													<div className="delete-btn" onClick={this.openConfirmWindow}>
														<i className="el-icon-delete"></i> Удалить
													</div>
													<div className="answer-input">
														<AnswerForm text={this.state.text}
																	id={this.props.answer.id}
																	form_name={"edit_answer" + this.props.answer.id}
																	setAnswer={this.setAnswer}/>
													</div>
												</div>
											</section>
										</>
									)
								}
							})()}
						</>
					)
				} else {
					return (<HiddenAnswer answer={this.props.answer}/>)
				}
			} else {
				return (<section className="answer"><i className="el-icon-loading loading-icon"></i></section>)
			}
		} else {
			return (<section className="answer"><i className="el-icon-loading loading-icon"></i></section>)
		}
	}
}

export default AnswerBlock
