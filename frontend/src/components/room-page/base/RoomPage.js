import React, { Component } from 'react'
import Cover from "../elements/Cover"
import Header from "../elements/Header"
import Answers from "../elements/Answers"
import MainAnswer from "../elements/MainAnswer"
import NewItems from "../elements/NewItems"
import axios from "axios"

class RoomPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            room: {},
            new_answers: [],
			header_visibility: 'hidden',
			roomLoadingStatus: 'undefined',
        }
        this.sendSocketEvent = this.sendSocketEvent.bind(this)
        this.clearNewAnswers = this.clearNewAnswers.bind(this)
        this.reloadRoom = this.reloadRoom.bind(this)
        this.scrollHandler = this.scrollHandler.bind(this)
    }

    componentDidMount() {
        this.props.set_section('')
        window.scrollTo(0, 0)
        const get_room = axios.get(window.location.origin + '/api/get-room/' + this.props.id, {
			onDownloadProgress: () => {
				this.setState({roomLoadingStatus: 'loading'})
			}
		}).catch(() => {
			this.setState({roomLoadingStatus: 'error'})
		})
        get_room.then(res => {
            const room = res.data
            this.setState({room: room})
			this.setState({roomLoadingStatus: 'loaded'})
        })
        axios.get(window.location.origin + '/api/set-room-view/' + this.props.id)
        let wsProtocol = ""
        if (window.location.protocol == 'https:') {
            wsProtocol = 'wss://'
        } else {
            wsProtocol = 'ws://'
        }
        this.roomSocket = new WebSocket(
            wsProtocol + window.location.host + '/ws/room/' + this.props.id)
        this.roomSocket.onmessage = e => {
            const data = JSON.parse(e.data)
            const text = data['text']
            const created_at = data['created_at']
            const author = data['author']
            const id = data['id']
            const answer = {
                'id': id,
                'text': text,
                'author': author,
                'created_at': created_at,
                'room': this.props.id,
            }
            // получим текущий параметр для сортировки
            const section = document.getElementById('active_section').getAttribute('data-section')
            if (section == 1) {
                this.setState({new_answers: this.state.new_answers.concat(answer)})
            } else if (section == 2) {
                this.setState({new_answers: [answer,].concat(this.state.new_answers)})
            }
        }
		document.addEventListener('scroll', this.scrollHandler); 
		return function () {
			document.removeEventListener('scroll', this.scrollHandler);
		};
    }
	
	scrollHandler = (e) => {
		if(e.target.documentElement.scrollTop > 400) {
			this.setState({header_visibility: 'opened'})
		} else {
			this.setState({header_visibility: 'hidden'})
		}
	}
	
	scrollToTop = (e) => {
		window.scrollTo(0, 0);
	}

    componentWillUnmount() {
		this.setState({header_visibility: 'hidden'})
        this.roomSocket.close()
    }

    clearNewAnswers = () => {
        this.setState({new_answers: []})
    }

    sendSocketEvent = (data) => {
		if(this.roomSocket.readyState == 1) {
			this.roomSocket.send(JSON.stringify({
				'type': 'new_answer',
				'text': data.text,
				'created_at': data.created_at,
				'id': data.id,
				'author': data.author,
			}))
		} else {
			const answer = {
                'id': data.id,
                'text': data.text,
                'author': data.author,
                'created_at': data.created_at,
                'room': this.props.id,
            }
			const section = document.getElementById('active_section').getAttribute('data-section')
            if (section == 1) {
                this.setState({new_answers: this.state.new_answers.concat(answer)})
            } else if (section == 2) {
                this.setState({new_answers: [answer,].concat(this.state.new_answers)})
            }
		}
    }

    reloadRoom = (data) => {
        this.setState({room: data})
    }

    render() {
		if (this.state.roomLoadingStatus == "loaded") {
			return (
				<main className="room-page">
					{(() => {
						if (this.state.room.tags) {
							return (
								<>
									<Cover cover={this.state.room.cover} />
									<Header cover={this.state.room.cover} room={this.state.room} reloadRoom={this.reloadRoom} is_admin={this.props.my_profile.is_admin} my_id={this.props.my_profile.id}/>
								</>
							)
						}
					})()}
					{(() => {
						if (this.state.room.author) {
							return (
								<>
									<div className={"room-scroll-header room-scroll-header-"+this.state.header_visibility} onClick={this.scrollToTop}>
										<i className="el-icon-arrow-up"></i>
										{this.state.room.name}
									</div>   
									<MainAnswer
										room_id={this.props.id}
										answer={{
											id: this.state.room.id,
											text: this.state.room ? this.state.room.message : null,
											name: this.state.room.name, created_at: this.state.room.created_at,
											author: {
												id: this.state.room.author.id,
												name: this.state.room.author.name,
												avatar: this.state.room.author.avatar,
												color: this.state.room.author.color ? this.state.room.author.color.type : null,
											}
										}}/>
									<Answers id={this.props.id} new_answers={this.state.new_answers}
											clearNewAnswers={this.clearNewAnswers} is_admin={this.props.my_profile.is_admin}
											room_saved_by={this.state.saved_by} room_type={this.state.room.type}
											room_name={this.state.room.name} sendSocketEvent={this.sendSocketEvent}
									/>
									<NewItems />
								</>
							)
						}
					})()}
				</main>
			)
		} else if (this.state.roomLoadingStatus == "error") {
			return (
				<main className="room-page">
					<h2 className="not-found-title">Тема не обнаружена.</h2>
				</main>
			)
		} else {
			return (
				<main className="room-page"><div className="loading-icon"><i className="el-icon-loading"></i></div></main>
			)
		}
    }
}

export default RoomPage
