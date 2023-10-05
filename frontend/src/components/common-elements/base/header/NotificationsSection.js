import React, { Component } from 'react'
import NotificationBlock from "./windows/NotificationBlock"
import axios from "axios"

class NotificationsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            notifications_block: 0,
            is_new_notifs: 0,
        }
        this.openWindow = this.openWindow.bind(this)
        this.setBell = this.setBell.bind(this)
        this.showNotifications = this.showNotifications.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-notifications').then(notifications => {
            let notifications_list = notifications.data
            this.setState({notifications: notifications_list})
        })
        axios.get(window.location.origin + '/api/is-new-notification').then((result) => {
            if (result.data == 1) {
                this.setBell()
            }
        })
        const add_notification = (data) => {
            this.setState({notifications: [data,].concat(this.state.notifications)})
            this.setBell()
        }
        this['userSocket' + this.props.my_id] = new WebSocket(
            'ws://' + window.location.host + '/ws/user/' + this.props.my_id)
        this['userSocket' + this.props.my_id].onmessage = (data) => {
            data = JSON.parse(event.data)
            const notification = {
                id: data.id,
                type: data.notif_type,
                object: data.object,
                text: data.text,
                sender: data.sender,
                created_at: data.created_at,
            }
            const remove_notification = (id) => {
                $.ajax({
                    type: 'post',
                    url: window.location.origin + '/api/delete-notification',
                    cache: false,
                    data: {id: id},
                    success: function (res_data) {
                        data.created_at = res_data.created_at
                        data.recipients.map(recipient => {
                            open_socket_and_send_msg(data, recipient)
                        })
                    },
                    error: function (xhr, status, error) {
                        console.log(JSON.parse(xhr.responseText))
                    }
                })
            }
            console.log(notification)
            if (notification.type == 1 || notification.type == 2) { //если получено уведомление о новом сообщении, то запиешм его только если мы не в ней
                let pathname_params = document.location.pathname.split('/')
                if (!(pathname_params[1] == 'room' && pathname_params[2] == notification.object)) {
                    add_notification(notification)
                } else {
                    remove_notification(notification.id)
                }
            } else if (notification.type = "block") {
                window.location.reload()
            } else {
                add_notification(notification)
            }
        }
    }

    componentWillUnmount() {
        this['userSocket' + this.props.my_id].close()
    }

    showNotifications = () => {
        const set_readed = () => {
            this.setState({is_new_notifs: 0})
        }
        if (this.state.is_new_notifs) {
            axios.get(window.location.origin + '/api/show-new-notifs').then(res => {
                if (res.data) {
                    set_readed()
                }
            })
        }
    }

    openWindow = () => {
        this.setState({notifications_block: (this.state.notifications_block ? 0 : 1)})
        this.showNotifications()
    }

    setBell = () => {
        if (!this.state.notifications_block) {
            this.setState({is_new_notifs: 1})
        }
    }

    render() {
        return (
            <>
                {this.state.notifications_block ? (
                    <NotificationBlock notifications={this.state.notifications} openWindow={this.openWindow}/>) : null}
                <div className="notifications-section">
                    <i className={this.state.is_new_notifs ? "el-icon-bell bell active-bell" : "el-icon-bell bell"}
                       data-type="notifications" id="notifications_btn" onClick={this.openWindow}></i>
                </div>
            </>
        )
    }
}

export default NotificationsSection
