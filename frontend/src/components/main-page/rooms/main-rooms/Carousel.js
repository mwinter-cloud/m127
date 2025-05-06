import React, { Component } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import Rating from "./Rating"
import MediaQuery from 'react-responsive'

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
            if (room_list.length != 0) {
                this.setState({rooms: room_list}, () => {
                    if (this.props.setRoomId) {
                        this.props.setRoomId(this.state.rooms[0].id)
                    }
                })
            }
        })
    }

    changeSelectedRoom = (e) => {
        let index = e.target.getAttribute('data-index')
        if (this.state.rooms[index] != undefined) {
            this.setState({
                selected_room: index
            })
            this.props.setRoomId(this.state.rooms[index].id)
        }
    }

    render() {
        if (this.state.rooms.length != 0) {
            return (
                <div className="carousel">
					<div className="blur-bg"><img src={this.state.rooms[this.state.selected_room].cover} /></div>
                    {this.state.rooms[this.state.selected_room] ? (
                        <article className="mainroomslide">
							<img
								src={this.state.rooms[this.state.selected_room].cover}
								className="picture"/>
                            <div className="header-text">
                                <Link to={"/room/" + this.state.rooms[this.state.selected_room].room.id}>
                                    <h1>{this.state.rooms[this.state.selected_room].room.name}</h1>
                                </Link>
                                <MediaQuery minWidth={801}>
                                    <Rating room_id={this.state.rooms[this.state.selected_room].id}/>
                                </MediaQuery>
                            </div>
                        </article>
                    ) : (
                        <article className="mainroomslide">
							<img
								src={this.state.rooms[0].cover}
								className="picture"/>

                            <div className="header-text">
                                <Link to={"/room/" + this.state.rooms[this.state.selected_room].room.id}>
                                    <h1>{this.state.rooms[0].room.name}</h1>
                                </Link>
                            </div>
                        </article>
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
            return (<div className="carousel">
                <div className="mainroomslide">
                    <div className="picture-block"></div>
                </div>
            </div>)
        }
    }
}

export default Carousel
