import React from "react"
import ConfirmWindow from "../../common-elements/windows/ConfirmWindow"

class ReportButton extends React.Component {
    constructor(props) {
        super(props)
        this.sendReport = this.sendReport.bind(this)
        this.addReport = this.addReport.bind(this)
        this.addNotification = this.addNotification.bind(this)
        this.sendSocketMsg = this.sendSocketMsg.bind(this)
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.state = {
            is_sended: 2,
            confirm_window_status: 'disabled',
        }
    }

    componentDidMount = () => {
        const set_sended = () => {
            this.setState({is_sended: 0})
            if (this.props.answer_id) {
                object_id = this.props.answer_id
                let is_report_sended = localStorage.getItem('report_answer_' + object_id)
                if (is_report_sended) {
                    this.setState({is_sended: 1})
                }
            }
        }
        const violator_id = this.props.violator_profile_id
        let object_id = 0
        let type = 0
        if (this.props.answer_id) {
            object_id = this.props.answer_id
            type = 4
        }
        $.ajax({
            type: 'post',
            url: window.location.origin + '/api/warning-exist',
            cache: false,
            data: {violator_id: violator_id, object_id: object_id, type: type},
            success: function (result) {
                if (result == 0) {
                    set_sended()
                }
            },
            error: function (xhr, status, error) {
                console.log('Ошибка при проверке существования жалобы')
            }
        })
    }

    sendReport = () => {
        if (!this.state.is_sended) {
            this.addReport()
        }
        this.openConfirmWindow()
    }

    addReport = () => {
        const send_notifications = () => {
            this.addNotification()
        }
        let data = {
            violator_id: this.props.violator_profile_id
        }
        if (this.props.answer_id) {
            data.object = this.props.answer_id
            data.type = 1
        }
        $.ajax({
            type: 'post',
            url: window.location.origin + '/api/add-report',
            cache: false,
            data: data,
            success: function (res_data) {
                send_notifications()
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    addNotification = () => {
        const recipient = this.props.violator_user_id
        const set_sended = () => {
            this.setState({is_sended: 1})
            if (this.props.answer_id) {
                localStorage.setItem('report_answer_' + this.props.answer_id, 1)
            }
        }
        const send_msg = (res_data) => {
            this.sendSocketMsg(res_data)
        }
        const open_socket_and_send_msg = (res_data) => {
            let wsProtocol = ""
            if (window.location.protocol == 'https:') {
                wsProtocol = 'wss://'
            } else {
                wsProtocol = 'ws://'
            }
            this['userSocket' + recipient] = new WebSocket(
                wsProtocol + window.location.host + '/ws/user/' + recipient)
            this['userSocket' + recipient].onopen = function () {
                send_msg(res_data)
            }
        }
        const notification_data = {
            recipient: this.props.violator_profile_id,
            type: 3,
        }
        $.ajax({
            type: 'post',
            url: window.location.origin + '/api/add-notification',
            cache: false,
            data: notification_data,
            success: function (res_data) {
                open_socket_and_send_msg(res_data)
                set_sended()
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    sendSocketMsg = (data) => {
        const recipient = this.props.violator_user_id
        const event_data = {
            'object': "",
            'text': "",
            'sender': {
                'id': this.props.my_profile.id, 'name': this.props.my_profile.name,
                'avatar': this.props.my_profile.avatar
            },
            'created_at': data.created_at,
            'notif_type': 3,
            'id': {}
        }
        const send_socket_msg = () => {
            this['userSocket' + recipient].send(JSON.stringify(event_data))
        }
        const closeWs = () => {
            this['userSocket' + recipient].close()
        }
        const sendPr = new Promise(function (resolve) {
            send_socket_msg()
            resolve()
        })
        sendPr.then(closeWs())
    }

    openConfirmWindow = () => {
        this.setState({confirm_window_status: (this.state.confirm_window_status == 'active' ? 'disabled' : 'active')})
    }

    render() {
        if (this.state.is_sended != 2) {
            return (
                <>
                    {this.state.confirm_window_status == 'active' && (
                        <ConfirmWindow confirmFunc={this.sendReport} close={this.openConfirmWindow} />)}
                    <div className="btn" onClick={this.openConfirmWindow}>
                        {this.state.is_sended ? (<i className="el-icon-check"></i>) :
                            (<i className="el-icon-help"></i>)} жалоба
                    </div>
                </>
            )
        } else {
            return ''
        }
    }
}

export default ReportButton