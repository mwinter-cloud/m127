import React from 'react'
import axios from "axios"

class SmileBlock extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			smiles: []
		}
		this.addSmile = this.addSmile.bind(this)
	}

	componentDidMount() {
		//получим смайлы из бд
		axios.get(window.location.origin + '/api/get-smiles').then(res => {
			const smiles = res.data
			this.setState({smiles: smiles})
		})
	}

	addSmile = (e) => {
		//добавим элемент в div contenteditable
		let img = e.target.cloneNode(true)
		let div_editable = document.getElementById(this.props.div_editable_name)
		div_editable.focus()
		let selection = window.getSelection(),
			range = selection.getRangeAt(0),
			temp = document.createElement('div'),
			insertion = document.createDocumentFragment()
		temp.appendChild(img)
		while (temp.firstChild) {
			insertion.appendChild(temp.firstChild)
		}
		range.deleteContents()
		range.insertNode(insertion)
		selection.collapseToEnd()
		let event = new Event('input', {
			bubbles: true,
			cancelable: true,
		})
		div_editable.dispatchEvent(event)
	}

	render() {
		return (
			<div className="smiles-block">
				<ul>
					{this.state.smiles.map((smile, index) => {
						return (
							<li key={index}><img src={smile.file} onClick={this.addSmile} className="smile"/></li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default SmileBlock
