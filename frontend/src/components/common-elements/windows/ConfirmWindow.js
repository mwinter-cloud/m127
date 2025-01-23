import React, {Component, createRef} from 'react'
import './style/confirm-window.css'

class ConfirmWindow extends Component {
    constructor(props) {
        super(props)
		this.confirmEvent = this.confirmEvent.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.confirmBtnRef = createRef()
    }
	
	componentDidMount() {
		this.confirmBtnRef.current.focus()
		document.addEventListener('keydown', this.handleClose)
	}
	
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleClose)
	}
	
	handleClose = (e) => {
		e = e || window.event
		if(e.keyCode==27) {
			this.props.close()
		}
		return true
	}
	
	/**
	handleSubmit = (e) => {
		e.preventDefault();
		const btn = this.confirmBtnRef.current;
        if (btn.hasAttribute('data-submitting')) return
        btn.setAttribute('data-submitting', "")
		confirmFunc()
	 **/

    confirmEvent = (e) => {
        e.preventDefault()
        const form = document.getElementById('submit_form')
        if (form.hasAttribute('data-submitting')) return
        form.setAttribute('data-submitting',"")
        this.props.confirmFunc()
    }

    render() {
        return (
            <>
                <div className="shadow"></div>
                <div className="confirm-window">
                    <p>Вы уверены, что хотите сделать это?</p>
                    <div className="btns">
                        <form id="submit_form" onSubmit={this.confirmEvent}>
						<button className="confirm-window-btn confirm-window-btn" type="submit" ref={this.confirmBtnRef}>Да</button>
                        </form>
                        <div className="close-window-btn confirm-window-btn" onClick={this.props.close}>Отмена</div>
                    </div>
                </div>
            </>
        )
    }
}

export default ConfirmWindow
