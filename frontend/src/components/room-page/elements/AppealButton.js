import React from 'react'

class AppealButton extends React.Component {
	constructor(props) {
		super(props)
		this.addAppeal = this.addAppeal.bind(this)
	}

	addAppeal = () => {
        let div_editable = document.getElementById("new_answer_form_div_editable")
        div_editable.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<appeal to='+this.props.id+' color='+(this.props.color?this.props.color.type:"") + ' answer='+(this.props.answer_id?this.props.answer_id:"")+'>'+this.props.name+', </appeal>';
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        })
        div_editable.dispatchEvent(event)
	}

	render() {
		return (
			<div className="btn" onClick={this.addAppeal}><i className="el-icon-chat-round"></i> ответить</div>
		)
	}
}

export default AppealButton