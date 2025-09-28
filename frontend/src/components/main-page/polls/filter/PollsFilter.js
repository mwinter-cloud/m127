import React, {Component} from 'react'
import TagFilter from "../../../common-elements/form/elements/tag-filter/TagFilter"
import {PollList} from "./PollList"
import {CreateFormBtn} from "./CreateFormBtn"
import MediaQuery from 'react-responsive'
import axios from "axios"

class PollsFilter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			polls: [],
			section: "new",
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
		const setPolls = (data) => {
			if (this.state.loaded_polls_count == 0) {
				this.setState({polls: data})
			} else {
				this.setState({polls: this.state.polls.concat(data)})
			}
		}
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('search_str', this.state.search_str)
		formData.append('loaded_polls_count', this.state.loaded_polls_count)
		formData.append('section', this.state.section)
		this.state.selected_tags.map((tag_id) => {
            formData.append('tags[]', tag_id)
        })
		axios.post(window.location.origin + '/api/get-polls', formData).then(({data}) => {
			setPolls(data.polls)
			this.setState({control_poll: data.control_poll})
			this.setState({loaded_polls_count: this.state.loaded_polls_count + 10})
		}).catch((data) => {
			this.setState({tags_loading_status: 'error'})
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
						<CreateFormBtn />
					</MediaQuery>
					<ul className="toggle">
						<li className={this.state.section == "saves" ? 'active-text saves' : 'saves'} onClick={this.onSelectSection} data-section="saves">закладки
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
						<CreateFormBtn />
					</MediaQuery>
				</div>
				<PollList polls={this.state.polls} loadPolls={this.loadPolls} section={this.state.section}
					onPollSearch={this.onPollSearch} control_poll={this.state.control_poll}
					changeMenuStatus={this.props.closeMenu} />
			</>
		)
	}
}

export default PollsFilter
