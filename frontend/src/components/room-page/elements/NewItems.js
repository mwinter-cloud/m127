import React, { Component } from 'react'
import axios from "axios"

class RoomPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
			error: "",
        }
    }

    componentDidMount() {
		const get_room = axios.get(window.location.origin + '/api/get-new-rooms').catch((err) => {
            this.setState({error: "Увы, записи не удалось получить."})
        }).then(res => {
            this.setState({rooms: res.data.rooms})
        })
    }

    render() {
        if (this.state.rooms.length != 0) {
			return (
				<section className="new-items-section">
					<h3>Новые темы</h3>
					<ul>
					{this.state.rooms.map((item, index) => {
						return(
							<li key={index}><a href={"/room/" + item.id + "/"}>{item.name}</a></li>
						);
					})}
					</ul>
				</section>
			);
        } else {
            return (<i className="el-icon-loading loading-icon"></i>);
        }
    }
}

export default RoomPage
