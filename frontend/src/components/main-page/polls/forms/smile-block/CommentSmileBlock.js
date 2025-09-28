import React from 'react'
import axios from "axios"
import '../../../../common-elements/form/style/smile-block.css'

class CommentSmileBlock extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			smiles: []
		}
		this.addSmile = this.addSmile.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.wrapperRef = React.createRef()
	}
	componentDidMount() {
	    document.addEventListener("mousedown", this.handleClickOutside)
		//получим смайлы из бд
		axios.get(window.location.origin + '/api/get-smiles').then(res => {
            const smiles = res.data
            this.setState({smiles: smiles})
        })
	}
	componentWillUnmount() {
	    document.removeEventListener("mousedown", this.handleClickOutside)
	}
	addSmile = (e) => {
		//добавим элемент в div contenteditable
		let img = e.target.cloneNode(true)
		let div_textarea = document.getElementById('comment_textareadiv')
		div_textarea.focus()
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
		div_textarea.dispatchEvent(event)
	}
    handleClickOutside(event) {
		//закрыть окно при клике вне блока
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target!=document.getElementById('.btn-icon')) {
            this.props.setSmilesBlock()
        }
	}
	render() {
	  return (
          <div className="smile-block" id="smile_block" ref={this.wrapperRef}>
            <ul>
                {this.state.smiles.map((smile, index) => {
                    return (
                        <li key={index}><img src={smile.file} onClick={this.addSmile} className="smile" /></li>
                    )
                })}
            </ul>
          </div>
	  )
	}
}

export default CommentSmileBlock
