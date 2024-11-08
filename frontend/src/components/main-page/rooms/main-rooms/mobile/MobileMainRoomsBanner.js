import React, { Component } from 'react'
import Carousel from "../Carousel"
import {InfoBlock} from "../InfoBlock"
import Rating from "../Rating"

class MobileMainRoomsBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_room: 'undefined',
            section: "rooms"
        }
        this.setRoomId = this.setRoomId.bind(this)
        this.changeSection = this.changeSection.bind(this)
    }

    setRoomId = (id) => {
        this.setState({selected_room: id})
    }

    changeSection = () => {
        this.setState({section: this.state.section=="rooms"?"info-block":"rooms"})
    }

    render() {
        return (
            <header className="cite-top container">
                <div className="sections-btn" onClick={this.changeSection}><i className="el-icon-arrow-right"></i></div>
                <Carousel setRoomId={this.setRoomId}/>
                            {this.state.selected_room!='undefined' ?
                                (<Rating room_id={this.state.selected_room}/>)
                                : null}
                {this.state.section == 'rooms' ? null :
                    (<div className="aside mobile-info-block"><InfoBlock/></div>)}
            </header>
        )
    }
}

export default MobileMainRoomsBanner
