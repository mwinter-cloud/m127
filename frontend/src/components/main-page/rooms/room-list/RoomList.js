import React, {Component} from 'react'
import RoomListHeader from "./RoomListHeader"
import {RoomListMarkup} from "./RoomListMarkup"
import '../../styles/room-list.css'
import MediaQuery from 'react-responsive'
import SearchBlock from "./SearchBlock"
import CreateRoomBtn from "./CreateRoomBtn"
import {MainRoomList} from "../main-rooms/MainRoomList"

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
		let setRooms = (data) => {
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
				setRooms(res.rooms)
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
				<MediaQuery minWidth={801}>
					<SearchBlock onSearch={this.onSearch} onTagSelect={this.onTagSelect}/>
						<MainRoomList device="desktop"/>
				</MediaQuery>
				<MediaQuery maxWidth={800}>
					<div className="mobile-room-list-header">
						<SearchBlock onSearch={this.onSearch} onTagSelect={this.onTagSelect} tags={this.full_tag_list} />
						<CreateRoomBtn />
					</div>
				</MediaQuery>
				<div className="all-rooms">
					<RoomListMarkup tags={this.state.full_tag_list} rooms={this.state.rooms} loadRooms={this.loadRooms}
						control_room={this.state.control_room} onTagSelect={this.onTagSelect}/>
				</div>
			</div>
		)
	}
}

export default RoomList
