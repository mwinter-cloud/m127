import React, { Component } from 'react'
import './style/confirm-window.css'

class ConfirmWindow extends Component {
    constructor(props) {
        super(props)
		this.confirmEvent = this.confirmEvent.bind(this)
    }

    confirmEvent = (e) => {
        e.preventDefault()
        const form = document.getElementById('submit_form')
        if (form.hasAttribute('data-submitting')) return
        form.setAttribute('data-submitting',"")
        this.props.confirm_function()
    }

    render() {
        return (
            <>
                <div className="shadow"></div>
                <div className="confirm-window">
                    <p>Вы уверены, что хотите сделать это?</p>
                    <div className="btns">
                        <form id="submit_form" onSubmit={this.confirmEvent}>
                            <button className="btn confirm-btn" type="submit">Да</button>
                        </form>
                        <div className="btn close-btn" onClick={this.props.close}>Отмена</div>
                    </div>
                </div>
            </>
        )
    }
}

export default ConfirmWindow
