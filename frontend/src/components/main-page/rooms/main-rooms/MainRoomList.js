import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"


class MainRoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
        }
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-header-rooms/'+(this.props.mobile?3:5)).then(res => {
            const room_list = res.data
            this.setState({rooms: room_list})
        })
    }

    render() {
        if (this.state.rooms.length != 0) {
            return (
                <div className="main-room-list container">
                    {this.state.rooms.map((room, index) => {
                        return (
                            <div className="room" key={index}>
                                <Link to={"./room/" + room.room.id}>
                                    <img src={room.cover}/>
                                    <div className="room-info">
                                        <h4>{room.room.name}</h4>
                                    </div>
                                    <div className="shadow-blur"></div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (<div className="main-room-list container"></div>)
        }
    }
}

export default MainRoomList
