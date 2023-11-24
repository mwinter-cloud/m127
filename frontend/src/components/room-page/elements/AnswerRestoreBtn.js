import React from 'react'

class AnswerRestoreBtn extends React.Component {
	constructor(props) {
		super(props)
		this.restore = this.restore.bind(this)
		this.state = {
			is_sended: 0,
		}
	}

	restore = (e) => {
        if (e.target.hasAttribute('data-submitting')) return
        e.target.setAttribute('data-submitting',"")
		const set_sended = () => {
			this.setState({is_sended: 1})
		}
		const answer_id = this.props.answer_id
		if (!this.state.is_sended) {
			$.ajax({
				type: 'post',
				url: window.location.origin + '/api/restore-answer',
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
			<div className="btn" onClick={this.restore}>
				{this.state.is_sended ? (<i className="el-icon-check"></i>) :
					(<i className="el-icon-refresh-left"></i>)} восстановить
			</div>
		)
	}
}

export default AnswerRestoreBtn