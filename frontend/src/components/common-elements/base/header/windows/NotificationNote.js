import React from 'react'
import parse from "html-react-parser"
import {Link} from "react-router-dom"
import SmallWindow from "../../../windows/SmallWindow"
import SimpleAnswerBlock from "../../../../room-page/elements/SimpleAnswerBlock"

class NotificationNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message_window: 0,
        }
        this.setMessageWindow = this.setMessageWindow.bind(this)
    }

    setMessageWindow = () => {
        this.setState({message_window: (this.state.message_window ? 0 : 1)})
    }

    render() {
        if (this.props.notification.type == 3) {
            return (
                <li className="notif-note">
                    <p><Link to="/admin-panel/reports"><i className="el-icon-help icon main-color"></i>
                        <span className="text-notif">Получена жалоба. Загляните в админ-панель
                                <i className="el-icon-right"></i></span></Link>
                    </p>
                </li>
            )
        } else if (this.props.notification.type == 4 || this.props.notification.type == 5) {
            return (
                <li className="notif-note">
                    <p><i className="el-icon-warning icon warning"></i>
                        <span
                            className="text-notif">Получено предупреждение. Постарайся не нарушать правила сообщества</span>
                    </p>
                </li>
            )
        } else {
            return (
                <li className="notif-note">
                    {this.state.message_window ?
                                (<SmallWindow closeWindow={this.setMessageWindow}
                                              children={<SimpleAnswerBlock closeWindow={this.setMessageWindow} id={this.props.notification.object}/>}
                                              title="Сообщение"/>)
                        : null}
                    <div onClick={this.setMessageWindow}>
                        <div className="author">
                            {this.props.notification.sender.name.length > 13 ?
                                (this.props.notification.sender.name.substring(0, 15) + "..") :
                                this.props.notification.sender.name}
                            <span className="date">{this.props.notification.created_at}</span>
                            {this.props.notification.sender.avatar ? (<img src={this.props.notification.sender.avatar}
                                                                           className="avatar"/>) : ''}
                        </div>
                        {(() => {
                            let text = this.props.notification.text.length > 99 ? (parse(String(this.props.notification.text)) + "..") : parse(String(this.props.notification.text))
                            if (this.props.notification.type === 0) { //спасибо
                                return (
                                    <p>благодарит за ответ "{text}"</p>
                                )
                            } else if (this.props.notification.type === 2) { //новое сообщение в комнате для подписчиков
                                return (
                                    <p>новое сообщение в комнате "{text}"</p>
                                )
                            } else if (this.props.notification.type === 1) { //ответ
                                return (
                                    <p>присылает ответ: "{text}"</p>
                                )
                            } else {
                                return (
                                    ''
                                )
                            }
                        })()}
                    </div>
                </li>
            )
        }
    }
}

export default NotificationNote