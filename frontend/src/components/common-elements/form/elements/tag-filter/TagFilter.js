import React from 'react'
import '../../style/tag-filter.css'
import axios from "axios"

class TagFilter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searched_tags: [],
			selected_tags: [],
			popular_tags: [],
			tags_loading_status: 'undefined'
		}
		this.onTagSearch = this.onTagSearch.bind(this)
		this.onTagSelect = this.onTagSelect.bind(this)
		this.appendStateTag = this.appendStateTag.bind(this)
		this.onRemoveTag = this.onRemoveTag.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.openTagList = this.openTagList.bind(this)
		this.wrapperRef = React.createRef()
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside)
		if (this.props.items == "rooms") {
			axios.get(window.location.origin + '/api/get-popular-tags').then(({data}) => {
				const tags = data
				this.setState({popular_tags: tags})
			})
		}
		// инициализация тегов для формы редактирования
		if (this.props.tags) {
			this.props.tags.map(el=> {
				let tag = {id: el.id, name: el.name}
				this.appendStateTag(tag)
			})
		}
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside)
	}
	
	openTagList = () => {
		if(this.state.searched_tags.length == 0) {
			let popular_tags = this.state.popular_tags
			if(popular_tags.length == 0) {
				axios.get(window.location.origin + '/api/get-popular-tags', {
					onDownloadProgress: () => {
						this.setState({tags_loading_status: 'loading'})
					}
				}).then(({data}) => {
					this.setState({searched_tags: data})
					this.setState({tags_loading_status: 'loaded'})
				})
			} else {
				this.setState({tags_loading_status: 'loaded'})
				this.setState({searched_tags: popular_tags})
			}
		}
	}

	onTagSearch = (e) => {
		const set_tags = (data) => {
			this.setState({searched_tags: data})
		}
		const search_str = e.target.value
		if (search_str != "") {
			const formData = new FormData()
			formData.append('csrfmiddlewaretoken', csrftoken)
			formData.append('search_str', search_str)
			axios.post(window.location.origin + '/api/get-tags', formData).then(({data}) => {
				this.setState({tags_loading_status: 'loaded'})
				set_tags(data)
			}).catch((data) => {
				this.setState({tags_loading_status: 'error'})
			})
		} else {
			set_tags([])
		}
	}

	onTagSelect = (e) => {
		let tag_id = e.target.getAttribute('data-id')
		let tag_name = e.target.textContent
		let tag = {id: tag_id, name: tag_name}
		this.appendStateTag(tag)
	}

	appendStateTag = (tag) => {
		let already_added = 0 //проверим, нет ли данного тега в списке, чтобы не повторяться
		this.state.selected_tags.forEach(selected_tag => {
			if (selected_tag.id == tag.id) {
				already_added = 1
			}
		})
		if (already_added == 0) {
			this.setState(prevState => ({
				selected_tags: [...prevState.selected_tags, tag]
			}), () => {
				this.props.onTagSelect(this.state.selected_tags)
			})
		}
	}
	onRemoveTag = (e) => {
		let tag_id = e.target.parentNode.getAttribute('data-id')
		let tag_name = e.target.parentNode.textContent
		let new_arr = []
		this.state.selected_tags.forEach(tag => {
			if (tag.id != tag_id) {
				new_arr.push(tag)
			}
		})
		this.setState({selected_tags: new_arr}, () => {
			this.props.onTagSelect(this.state.selected_tags)
		})
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target != document.getElementById('notifications_btn')) {
			this.setState({searched_tags: []})
		}
	}

	render() {
		return (
			<>
				<div className="tag-search-block">
					<input className={this.props.type == "form" ? ("tags-select-input") : ("tag-search")}
						   placeholder="Категории" onInput={this.onTagSearch} onClick={this.openTagList}/>
					<div className={this.state.searched_tags.length == 0 ? "hide" : "search-result tags-list"} ref={this.wrapperRef}>
						{this.state.tags_loading_status == 'loading' || this.state.tags_loading_status == 'undefined' && <div className="loading-icon"><i className="el-icon-loading"></i></div>}
						{this.state.tags_loading_status == 'error' && <p className="error-msg">Получить список не удалось.</p>}
						<ul className="tag-list">
							{this.state.searched_tags?.map((tag, index) => {
								return (
									<li key={index} data-id={tag.id} onClick={this.onTagSelect}>
										{tag.name}
									</li>
								)
							})}
						</ul>
					</div>
					<ul id={"selected_" + this.props.type + "_tags"} className="selected-tags">
						{this.state.selected_tags.map((tag, index) => {
							return (
								<li key={index} data-id={tag.id}>
									{tag.name} <i className="el-icon-minus remove-tag" onClick={this.onRemoveTag}></i>
								</li>
							)
						})}
					</ul>
				</div>
				{this.props.popular_tags == 'true' ? (
					<>
						<div className="border-line"></div>
						<div className="tags-block">
							<h3>Частые темы</h3>
							<ul>
								{this.state.popular_tags.map((tag, index) => {
									return (
										<li key={index} data-id={tag.id} onClick={this.onTagSelect}>
											{tag.name}
										</li>
									)
								})}
							</ul>
						</div>
					</>
				) : ("")
				}
			</>
		)
	}
}

export default TagFilter
