import React, {Component} from "react"
import NotificationBlock from "./windows/NotificationBlock"
import axios from "axios"

class NotificationsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            notifications_block_status: 'disabled',
            is_new_notifs: 'undefined',
        }
        this.changeWindowStatus = this.changeWindowStatus.bind(this)
        this.setActiveBell = this.setActiveBell.bind(this)
        this.showNotifications = this.showNotifications.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-notifications').then(({data}) => {
            this.setState({notifications: data})
        })
        axios.get(window.location.origin + '/api/is-new-notification').then(({data}) => {
            if (data == 1) {
                this.setActiveBell()
            }
        })
        const add_notification = (data) => {
            this.setState({notifications: [data,].concat(this.state.notifications)})
            this.setActiveBell()
        }
        let wsProtocol = ""
        if (window.location.protocol == 'https:') {
          wsProtocol = 'wss://'
        } else {wsProtocol = 'ws://'}
        this['userSocket' + this.props.my_id] = new WebSocket(
            wsProtocol + window.location.host + '/ws/user/' + this.props.my_id)
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
			const formData = new FormData()
			formData.append('csrfmiddlewaretoken', csrftoken)
			formData.append('id', id)
			axios.post(`${window.location.origin}/api/delete-notification`, formData).then(({data}) => {
				console.log('Чеширский кот исчезает, улыбка остается.')
			}).catch((data) => {
				console.log('Удалить уведомление не удалось.')
			})
            if (notification.type == 1 || notification.type == 2) {
                //если получено уведомление о новом сообщении, то запиешм его только если мы не в комнате
                let pathname_params = document.location.pathname.split('/')
                if (!(pathname_params[1] == 'room' && pathname_params[2] == notification.id.room)) {
                    add_notification(notification)
                } else {
                    remove_notification(notification.id.notification)
                }
            } else if (notification.type == "block") {
                //участник был заблокирован, надо его вывести
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
        if (this.state.is_new_notifs == 'active') {
            axios.get(window.location.origin + '/api/show-new-notifs').then(({data}) => {
                if (data) {
                    this.setState({is_new_notifs: 'disabled'})
                }
            })
        }
		axios.get(`${window.location.origin}/api/show-new-notifs`).catch(() => {
			console.log('Ошибка получения новых уведомлений.')
		}).then(({data}) => {
            this.setState({is_new_notifs: 'disabled'})
        })
    }

    changeWindowStatus = () => {
        this.setState({notifications_block_status: (this.state.notifications_block_status == 'active' ? 'disabled' : 'active')})
        this.showNotifications()
    }

    setActiveBell = () => {
        if (this.state.notifications_block_status == 'disabled') {
            this.setState({is_new_notifs: 'active'})
        }
    }

    render() {
        return (
            <>
                {this.state.notifications_block_status == 'active' && (
                    <NotificationBlock notifications={this.state.notifications} openWindow={this.changeWindowStatus}/>)}
                <div className="notifications-section">
                    <i className={`el-icon-bell bell ${this.state.is_new_notifs}-bell`}
                       data-type="notifications" id="notifications_btn" onClick={this.changeWindowStatus}></i>
                </div>
            </>
        )
    }
}

export default NotificationsSection
