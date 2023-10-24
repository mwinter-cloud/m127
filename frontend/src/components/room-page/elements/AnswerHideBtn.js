import React from 'react'

class AnswerHideBtn extends React.Component {
	constructor(props) {
		super(props)
		this.setHide = this.setHide.bind(this)
		this.state = {
			is_sended: 0,
		}
	}

	setHide = () => {
		const set_sended = () => {
			this.setState({is_sended: 1})
		}
		const answer_id = this.props.answer_id
		if (!this.state.is_sended) {
			$.ajax({
				type: 'post',
				url: window.location.origin + '/api/hide-answer',
				cache: false,
				data: {answer_id: answer_id},
				success: function () {
					set_sended()
				},
				error: function (xhr, status, error) {
					console.log(JSON.parse(xhr.responseText))
				}
			})
		}
	}

	render() {
		return (
			<div className="btn" onClick={this.setHide}>
				{this.state.is_sended ? (<i className="el-icon-check"></i>) :
					(<i className="el-icon-remove-outline"></i>)} скрыть ответ
			</div>
		)
	}
}

export default AnswerHideBtn