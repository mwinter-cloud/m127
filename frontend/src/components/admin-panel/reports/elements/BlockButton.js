import React, { Component } from 'react'
import ConfirmWindow from "../../../common-elements/windows/ConfirmWindow"

class BlockButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm_window: 0,
            ability_to_block: 0,
        }
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.setBlock = this.setBlock.bind(this)
        this.sendSocketMsg = this.sendSocketMsg.bind(this)
    }

    componentDidMount() {
        const set_ability_to_block = (val) => {
            this.setState({ability_to_block: val})
        }
        const violator_id = this.props.violator_profile_id
        let object_id = 0
        let type = 0
        if(this.props.answer_id) {
            object_id = this.props.answer_id
            type = 4
        }
        $.ajax({
            type: 'post',
            url: window.location.origin + '/api/is-ability-to-block',
            cache: false,
            data: {violator_id: violator_id, object_id: object_id, type: type},
            success: function (result) {
                set_ability_to_block(result)
            },
            error: function (xhr, status, error) {
                console.log('Ошибка при проверке существования жалобы')
            }
        })
    }

    openConfirmWindow = () => {
        this.setState({confirm_window: (this.state.confirm_window ? 0 : 1)})
    }

    sendSocketMsg = () => {
		const event_recipient = this.props.violator_user_id
        const event_data = {
			'object': "",
			'text': "",
			'sender': {},
			'created_at': "",
			'notif_type': "block",
		}
		const send_socket_msg = () => {
			this['userSocket' + event_recipient].send(JSON.stringify(event_data))
		}
		const closeWs = () => {
			this['userSocket' + event_recipient].close()
		}
		const sendPr = new Promise(function (resolve) {
			send_socket_msg()
			resolve()
		})
		sendPr.then(closeWs())
	}

    setBlock = () => {
        const profile_id = this.props.violator_profile_id
        const event_recipient = this.props.violator_user_id
        const send_msg = () => {this.sendSocketMsg()}
		const open_socket_and_send_msg = () => {
			this['userSocket' + event_recipient] = new WebSocket(
				'ws://' + window.location.host + '/ws/user/' + event_recipient)
			this['userSocket' + event_recipient].onopen = function () {
				send_msg()
			}
		}
        $.ajax({
            type: 'post',
            url: window.location.origin + '/api/block-profile',
            cache: false,
            data: {profile_id: profile_id},
            success: function () {
                open_socket_and_send_msg()
                document.querySelectorAll('.btn-block-profile-'+profile_id).forEach(btn=>btn.classList.add('hide'))
            },
            error: function (xhr, status, error) {
                console.log('Ошибка блокировки участника')
            }
        })
        this.openConfirmWindow()
    }

    render() {
        return (
            <>
                {this.state.confirm_window ? (
                    <ConfirmWindow confirm_function={this.setBlock} close={this.openConfirmWindow}/>) : null}
                {this.state.ability_to_block ?
                    (<div className={'btn btn-block-profile-'+this.props.violator_profile_id} onClick={this.openConfirmWindow}>Заблокировать участника</div>)
                    : null}
            </>
        )
    }
}

export default BlockButton
