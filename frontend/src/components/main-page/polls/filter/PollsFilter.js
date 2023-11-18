import React, { Component } from 'react'
import TagFilter from "../../../common-elements/form/elements/tag-filter/TagFilter"
import PollList from "./PollList"
import CreateFormBtn from "./CreateFormBtn"
import MediaQuery from 'react-responsive'

class PollsFilter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			polls: [],
			section: "popular",
			search_str: "",
			selected_tags: [],
			loaded_polls_count: 0,
			control_poll: 0,
		}
		this.loadPolls = this.loadPolls.bind(this)
		this.onTagSelect = this.onTagSelect.bind(this)
		this.onPollSearch = this.onPollSearch.bind(this)
		this.onSelectSection = this.onSelectSection.bind(this)
		this.changeSection = this.changeSection.bind(this)
	}

	componentDidMount() {
		this.loadPolls()
	}

	loadPolls = () => {
		let tags = this.state.selected_tags
		let search_str = this.state.search_str
		let section = this.state.section
		let loaded_polls_count = this.state.loaded_polls_count
		let data = {search_str: search_str, loaded_polls_count: loaded_polls_count, tags: tags, section: section}
		let set_polls = (data) => {
			if (loaded_polls_count == 0) {
				this.setState({
					polls: data
				})
			} else {
				this.setState({
					polls: this.state.polls.concat(data)
				})
			}
		}
		let set_control_poll = (data) => {
			this.setState({
				control_poll: data
			})
		}
		let set_polls_count = () => {
			this.setState({
				loaded_polls_count: loaded_polls_count + 10
			})
		}
		$.ajax({
			type: 'post',
			url: '/api/get-polls',
			cache: false,
			data: data,
			success: function (res) {
				set_polls(res.polls)
				set_control_poll(res.control_poll)
				set_polls_count()
			},
			error: function (xhr) {
				console.log(JSON.parse(xhr.responseText))
			}
		})
	}

	changeSection = () => {
		this.setState({section: this.state.section == "new" ? "popular" : "new"}, () => {
			this.setState({loaded_polls_count: 0}, () => {
				this.loadPolls()
			})
		})
	}

	onPollSearch = (e) => {
		const search_str = e.target.value
		this.setState({search_str: search_str}, () => {
			this.setState({loaded_polls_count: 0}, () => {
				this.loadPolls()
			})
		})
	}
	onSelectSection = (e) => {
		const section = e.target.getAttribute('data-section')
		this.setState({section: section}, () => {
			this.setState({loaded_polls_count: 0}, () => {
				this.loadPolls()
			})
		})
	}
	onTagSelect = (full_tag_list) => {
		let tag_list = []
		full_tag_list.map(tag => {
			tag_list.push(tag.id)
		})
		this.setState({selected_tags: tag_list}, () => {
			this.setState({loaded_polls_count: 0}, () => {
				this.loadPolls()
			})
		})
	}

	render() {
		return (
			<>
				<div className="block-title">
					<MediaQuery minWidth={801}>
						<h4>Выбрать опрос</h4>
						<CreateFormBtn/>
					</MediaQuery>
					<ul className="toggle">
						<li className={this.state.section == "saves" ? 'active-text saves' : 'saves'}
							onClick={this.onSelectSection} data-section="saves">закладки
						</li>
						<li>
							<i className="el-icon-arrow-down" onClick={this.changeSection}></i>
							<span
								className={(this.state.section == "new" || this.state.section == "popular") ? 'active-text' : null}
								onClick={this.onSelectSection}
								data-section={this.state.section == "new" ? "new" : "popular"}>
							{(this.state.section == "new") ? "новое" : "популярное"}
						</span></li>
					</ul>
				</div>
				<div className="poll-tag-search">
					<TagFilter items="polls" onTagSelect={this.onTagSelect}/>
					<MediaQuery maxWidth={800}>
						<CreateFormBtn/>
					</MediaQuery>
				</div>
				<PollList polls={this.state.polls} loadPolls={this.loadPolls} section={this.state.section}
						  onPollSearch={this.onPollSearch} control_poll={this.state.control_poll}
						  closeMenu={this.props.closeMenu}/>
			</>
		)
	}
}

export default PollsFilter
