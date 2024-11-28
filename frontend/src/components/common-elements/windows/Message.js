import React, { Component } from 'react'
import './style/message.css'

class Message extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.type=="hello") {
            return (
                <div className="message-win">
					<div className="border-line"></div>
                    <p>Прекрасно! Регистрация успешно выполнена.</p>
                    <div className="ok-btn" onClick={this.props.confirmWindow}>Отлично</div>
					<div className="border-line"></div>
                </div>
            )
        } else {
            return null
        }
    }
}

export default Message
