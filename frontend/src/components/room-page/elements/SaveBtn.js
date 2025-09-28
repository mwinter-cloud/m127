import React, { Component } from 'react'
import axios from "axios"

class SaveBtn extends Component {
    constructor(props) {
        super(props)
		this.state = {
			room_saved: "undefinded",
		}
        this.saveRoom = this.saveRoom.bind(this)
    }

    componentDidMount() {
        const set_saved_status = (val) => {this.setState({room_saved: val})}

        axios.get(window.location.origin + '/api/is-room-saved/' + this.props.room_id).then(res => {
            set_saved_status(res.data)
        })
    }

    saveRoom = () => {
        const room_id = this.props.room_id
        const set_saved_status = (val) => {this.setState({room_saved: val})}
        const saved_status = this.state.room_saved
        $.ajax({
                type: 'post',
                url: '/api/save-room',
                cache: false,
                data: {room_id: room_id, saved_status: saved_status},
                success: function (result) {
                    set_saved_status(result)
                },
                error: function () {
                    console.log('При сохранении комнаты возникла ошибка. Попробуй позже.')
                }
            })
    }

    render() {
        if(this.state.room_saved!="undefinded") {
            return (
                <li className="underline-hover blue-text" onClick={this.saveRoom}>
                    {this.state.room_saved ? "Сохранено" : "Сохранить"}
                </li>
            )
        } else { return null }
    }
}

export default SaveBtn
