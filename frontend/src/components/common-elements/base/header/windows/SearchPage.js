import React, { Component } from 'react'
import SearchResultBlock from "./SearchResultBlock"

class SearchPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		document.querySelector('.search-block .search').classList.add('big-search')
	}

	componentWillUnmount() {
		document.querySelector('.search-block .search').classList.remove('big-search')
	}

	render() {
		return (
			<main className="profile-page search-page">
				<div className="back-arrow" onClick={this.props.closeWindow}><i className="el-icon-arrow-left"></i>
				</div>
				<h2>результат поиска по запросу <span className="search-str">{this.props.search_str}</span></h2>
				<SearchResultBlock title="Комнаты" loadRooms={this.props.loadItems} items={this.props.rooms}
								   control_item={this.props.control_room} link="room" name_field="name"
								   closeWindow={this.props.closeWindow}/>
				<SearchResultBlock title="Опросы" loadRooms={this.props.loadItems} items={this.props.polls}
								   closeWindow={this.props.closeWindow} control_item={this.props.control_poll}
								   link="poll" name_field="question"/>
				<SearchResultBlock title="Участники" loadRooms={this.props.loadItems} items={this.props.members}
								   closeWindow={this.props.closeWindow} control_item={this.props.control_member}
								   link="profile" name_field="name"/>
			</main>
		)
	}
}

export default SearchPage
