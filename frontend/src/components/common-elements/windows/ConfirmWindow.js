import React, { Component } from 'react'
import './style/confirm_window.css'

class ConfirmWindow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <div className="shadow"></div>
                <div className="confirm-window">
                    <p>Вы уверены, что хотите сделать это?</p>
                    <div className="btns">
                        <div className="btn confirm-btn" onClick={this.props.confirm_function}>Да</div>
                        <div className="btn close-btn" onClick={this.props.close}>Отмена</div>
                    </div>
                </div>
            </>
        )
    }
}

export default ConfirmWindow
