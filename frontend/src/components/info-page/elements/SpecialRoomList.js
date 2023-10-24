import React, { Component } from 'react'
import axios from "axios"

class SpecialRoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
        }
    }

    componentDidMount() {
        const set_rooms = (data) => {
            this.setState({rooms: data})
        }
        axios.get(window.location.origin + '/api/get-oficial-rooms').then(res => {
            const rooms = res.data
            set_rooms(rooms)
        })
    }

    render() {
        return (
            <>
                <h2><i className="el-icon-chat-round"></i> Специальные темы</h2>
                <ul>
                    {this.state.rooms.map((room, index) => {
                        return (
                            <li key={index}><a href={"/room/" + room.id} target="_blank">{room.name}</a></li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default SpecialRoomList
