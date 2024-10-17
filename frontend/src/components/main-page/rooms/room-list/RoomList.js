import React, { Component } from 'react'
import RoomListHeader from "./RoomListHeader"
import RoomListAside from "./RoomListAside"
import RoomListContent from "./RoomListContent"
import '../../styles/room-list.css'
import MediaQuery from 'react-responsive'

class RoomList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			rooms: [],
			search_str: "",
			section: "popular",
			selected_tags: [],
			loaded_rooms_count: 0,
			control_room: 0,
			full_tag_list: []
		}
		this.loadRooms = this.loadRooms.bind(this)
		this.onSearch = this.onSearch.bind(this)
		this.onTagSelect = this.onTagSelect.bind(this)
	}

	componentDidMount() {
		this.loadRooms()
	}

	loadRooms = () => {
		let tags = this.state.selected_tags
		let search_str = this.state.search_str
		let section = this.state.section
		let loaded_rooms_count = this.state.loaded_rooms_count
		let data = {search_str: search_str, loaded_rooms_count: loaded_rooms_count, tags: tags, section: section}
		let set_rooms = (data) => {
			if (loaded_rooms_count == 0) {
				this.setState({
					rooms: data
				})
			} else {
				this.setState({
					rooms: this.state.rooms.concat(data)
				})
			}
		}
		let set_control_room = (data) => {
			this.setState({
				control_room: data
			})
		}
		let set_rooms_count = () => {
			this.setState({
				loaded_rooms_count: loaded_rooms_count + 10
			})
		}
		$.ajax({
			type: 'post',
			url: '/api/get-rooms',
			cache: false,
			data: data,
			success: function (res) {
				console.log(res)
				set_rooms(res.rooms)
				set_control_room(res.control_room)
				set_rooms_count()
			},
			error: function (xhr) {
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}
	onSearch = (e) => {
		const search_str = e.target.value
		this.setState({search_str: search_str}, () => {
			this.setState({loaded_rooms_count: 0}, () => {
				this.loadRooms()
			})
		})
	}
	selectSection = (e) => {
		const section = e.target.getAttribute('data-section')
		this.setState({section: section}, () => {
			this.setState({loaded_rooms_count: 0}, () => {
				this.loadRooms()
			})
		})
	}
	onTagSelect = (full_tag_list) => {
		this.setState({full_tag_list: full_tag_list})
		let tag_list = []
		full_tag_list.map(tag => {
			tag_list.push(tag.id)
		})
		this.setState({selected_tags: tag_list}, () => {
			this.setState({loaded_rooms_count: 0}, () => {
				this.loadRooms()
			})
		})
	}

	render() {
		return (
			<div className="room-list container">
				<RoomListHeader selectSection={this.selectSection} section={this.state.section}/>
				<div className="all-rooms">
					<MediaQuery minWidth={801}>
						<RoomListAside onTagSelect={this.onTagSelect}/>
					</MediaQuery>
					<RoomListContent tags={this.state.full_tag_list} rooms={this.state.rooms} onSearch={this.onSearch} loadRooms={this.loadRooms}
									 control_room={this.state.control_room} onTagSelect={this.onTagSelect}/>
				</div>
			</div>
		)
	}
}

export default RoomList
