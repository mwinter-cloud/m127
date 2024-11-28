import React, {Component} from "react"
import SearchPage from "../windows/SearchPage"
import FullScreenWindow from "../../../windows/FullScreenWindow"
import SearchForm from "../SearchForm"

class MobileCiteSearch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			form_status: 'disabled',
			search_str: '',
			search_window_status: 'disabled',
			rooms: [],
			loaded_rooms_count: 0,
			control_room: 0,
			polls: [],
			loaded_polls_count: 0,
			control_poll: 0,
			members: [],
			loaded_members_count: 0,
			control_member: 0,
		}
		this.loadItems = this.loadItems.bind(this)
		this.setSearchString = this.setSearchString.bind(this)
		this.showSearchForm = this.showSearchForm.bind(this)
		this.setSearchWindow = this.setSearchWindow.bind(this)
	}

	showSearchForm = () => {
		this.setState({form_status: this.state.form_status == 'active' ? 'disabled' : 'active'})
	}

	setSearchString = (val) => {
		this.setState({search_str: val})
		this.setState({search_window_status: this.state.search_window_status == 'disabled' ? 'active' : 'active'})
		this.loadItems()
	}

	setSearchWindow = () => {
		this.setState({search_window_status: this.state.search_window_status == 'active' ? 'disabled' : 'active'})
	}

	loadItems = () => {
		let search_str = this.state.search_str
		let loaded_rooms_count = this.state.loaded_rooms_count
		let loaded_polls_count = this.state.loaded_polls_count
		let loaded_members_count = this.state.loaded_members_count
		let data = {
			search_str: search_str, loaded_rooms_count: loaded_rooms_count, loaded_polls_count: loaded_polls_count,
			loaded_members_count: loaded_members_count
		}
		let set_items = (data) => {
			if (loaded_rooms_count == 0) {
				this.setState({rooms: data.rooms})
				this.setState({polls: data.polls})
				this.setState({members: data.members})
			} else {
				this.setState({rooms: this.state.rooms.concat(data.rooms)})
				this.setState({polls: this.state.polls.concat(data.polls)})
				this.setState({members: this.state.members.concat(data.members)})
			}
		}
		let set_controls = (data) => {
			this.setState({control_room: data.control_room})
			this.setState({control_poll: data.control_poll})
			this.setState({control_member: data.control_member})
		}
		let set_counts = () => {
			this.setState({loaded_rooms_count: loaded_rooms_count + 10})
			this.setState({loaded_polls_count: loaded_polls_count + 10})
			this.setState({loaded_members_count: loaded_members_count + 10})
		}
		$.ajax({
			type: 'post',
			url: '/api/get-search-items',
			cache: false,
			data: data,
			success: function (res) {
				set_items(res)
				set_controls(res)
				set_counts()
			},
			error: function (xhr) {
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}

	render() {
		return (
			<>
				{this.state.search_window_status == 'active' && (<FullScreenWindow 
					children={<SearchPage loadItems={this.loadItems} rooms={this.state.rooms}
					polls={this.state.polls}
					members={this.state.members} control_room={this.state.control_room}
					control_poll={this.state.control_poll}
					control_member={this.state.control_member}
					search_str={this.state.search_str}
					closeWindow={this.setSearchWindow} />} />)}
				<div className="open-search-btn" onClick={this.showSearchForm}>
					<i className="el-icon-search"></i>
				</div>
				{this.state.form_status == 'active' && (<SearchForm setSearchString={this.setSearchString} />)}
			</>
		)
	}
}

export default MobileCiteSearch
