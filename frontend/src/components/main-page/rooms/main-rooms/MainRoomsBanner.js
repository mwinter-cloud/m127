import React, { Component } from 'react'
import Carousel from "./Carousel"
import InfoBlock from "./InfoBlock"
import Rating from "./Rating"

class MainRoomsBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_room: 0
        }
        this.setRoomId = this.setRoomId.bind(this)
    }

    setRoomId = (id) => {
        this.setState({selected_room: id})
    }

    render() {
        return (
            <header className="cite-top container">
                <Carousel setRoomId={this.setRoomId}/>
                <div className="aside">
                    <InfoBlock/>
                    {this.state.selected_room ?
                        (<Rating room_id={this.state.selected_room}/>)
                        : null}
                </div>
            </header>
        )
    }
}

export default MainRoomsBanner
