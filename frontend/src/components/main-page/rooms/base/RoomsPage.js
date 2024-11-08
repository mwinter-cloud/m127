import React, { Component } from 'react'
import {MainRoomsMarkup} from "../main-rooms/MainRoomsMarkup"
import RoomList from "../room-list/RoomList"
import Message from "../../../common-elements/windows/Message"


class RoomsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            special_message: 'hidden'
        }
		this.confirmWindow = this.confirmWindow.bind(this)
    }

    componentDidMount() {
        this.props.set_section('rooms')
        window.scrollTo(0,0)
        const hello = localStorage.getItem("hello")
        if(hello=="True") {
            this.setState({special_message: "showed"})
        }
    }

    confirmWindow = () => {
        localStorage.removeItem('hello')
        this.setState({special_message: 'showed'})
    }

    render() {
        return (
            <main className="main-page">
                {this.state.special_message=="showed" && <Message type="hello" confirmWindow={this.confirmWindow}/>}
                <MainRoomsMarkup/>
                <RoomList/>
            </main>
        )
    }
}

export default RoomsPage
