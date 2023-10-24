import React, { Component } from 'react'
import MainRooms from "../main-rooms/MainRooms"
import RoomList from "../room-list/RoomList"
import Message from "../../../common-elements/windows/Message"


class RoomsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            special_message: 0
        }
		this.confirmWindow = this.confirmWindow.bind(this)
    }

    componentDidMount() {
        this.props.set_section('rooms')
        window.scrollTo(0,0)
        const hello = localStorage.getItem("hello")
        if(hello=="True") {
            this.setState({special_message: "hello"})
        }
    }

    confirmWindow = () => {
        localStorage.removeItem('hello')
        this.setState({special_message: 0})
    }

    render() {
        return (
            <main className="main-page">
                {this.state.special_message=="hello"?(<Message type="hello" confirmWindow={this.confirmWindow}/>):null}
                <MainRooms/>
                <RoomList/>
            </main>
        )
    }
}

export default RoomsPage
