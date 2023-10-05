import React from 'react'
import {specialtagstohtml} from "../../common-elements/form/elements/editor/TextEditor"

class QuoteButton extends React.Component {
	constructor(props) {
		super(props)
		this.addQuote = this.addQuote.bind(this)
	}

    addQuote = () => {
        let div_editable = document.getElementById('new_answer_form_div_editable')
        div_editable.focus()
        let selection = window.getSelection(),
        range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="background: #2b2c31; padding: 5px;">'+specialtagstohtml(this.props.text)+'<span style="font-size:.9em;">(-> <appeal to='+this.props.id+' color='+(this.props.color?this.props.color.type:"")+'>'+this.props.name+'</appeal>)</span></div>';
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
			<div className="btn" onClick={this.addQuote}><i className="el-icon-download"></i> цитата</div>
		)
	}
}

export default QuoteButton