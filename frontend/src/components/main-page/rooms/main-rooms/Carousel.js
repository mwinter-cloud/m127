import React, { Component } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"

class Carousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_room: 0,
            rooms: [],
        }
        this.changeSelectedRoom = this.changeSelectedRoom.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-carousel-rooms').then(res => {
            const room_list = res.data
            this.setState({rooms: room_list},() => {
                this.props.setRoomId(this.state.rooms[0].id)
            })
        })
    }

    changeSelectedRoom = (e) => {
        let index = e.target.getAttribute('data-index')
        this.setState({
            selected_room: index
        })
        this.props.setRoomId(this.state.rooms[index].id)
    }

    render() {
        if (this.state.rooms.length != 0) {
            return (
                <div className="carousel">
                    {this.state.rooms[this.state.selected_room] ? (
                        <div className="mainroomslide">
                            <img
                                src={this.state.rooms[this.state.selected_room].cover}
                                className="picture"/>
                            <Link to={"/room/" + this.state.rooms[this.state.selected_room].room.id}>
                                <div className="header-text">
                                    <h1>{this.state.rooms[this.state.selected_room].room.name}</h1>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="mainroomslide">
                            <img
                                src={this.state.rooms[0].cover}
                                className="picture"/>
                            <Link to={"/room/" + this.state.rooms[this.state.selected_room].room.id}>
                                <div className="header-text"><h1>{this.state.rooms[0].room.name}</h1>
                                </div>
                            </Link>
                        </div>
                    )}
                    <div className="toggles">
                        <div className={"toggle " + (this.state.selected_room == 0 ? "active" : null)}
                             onClick={this.changeSelectedRoom} data-index="0"></div>
                        <div className={"toggle " + (this.state.selected_room == 1 ? "active" : null)}
                             onClick={this.changeSelectedRoom} data-index="1"></div>
                        <div className={"toggle " + (this.state.selected_room == 2 ? "active" : null)}
                             onClick={this.changeSelectedRoom} data-index="2"></div>
                    </div>
                </div>
            )
        } else {
            return (<main className="carousel"><i className="el-icon-loading loading-icon"></i></main>)
        }
    }
}

export default Carousel
