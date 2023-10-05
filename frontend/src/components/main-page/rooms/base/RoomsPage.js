import React, { Component } from 'react'
import MainRooms from "../main-rooms/MainRooms"
import RoomList from "../room-list/RoomList"


class RoomsPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.set_section('rooms')
        window.scrollTo(0,0)
    }

    render() {
        return (
            <main className="main-page">
                <MainRooms/>
                <RoomList/>
            </main>
        )
    }
}

export default RoomsPage
