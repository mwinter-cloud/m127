import React, {Component} from 'react'
import axios from "axios"
import Header from "./elements/Header"
import {Options} from "./elements/Options"
import {PollFooter} from "./elements/PollFooter"

class PollContentField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: 'undefined',
			saved_loading_status: 'undefined',
            voices_count: 'undefined',
            selected_option: 0,
            voice_sending_status: 'undefined',
            voices: [],
			voices_loading_status: 'undefined'
        }
        this.selectOption = this.selectOption.bind(this)
        this.sendVoice = this.sendVoice.bind(this)
        this.deleteVoice = this.deleteVoice.bind(this)
        this.voiceOperation = this.voiceOperation.bind(this)
        this.initPollVoices = this.initPollVoices.bind(this)
        this.openSocket = this.openSocket.bind(this)
    }
	
	componentDidMount() {
		this.initPollVoices(this.props.poll.id) // запишем количество голосов для вариантов и подсчитаем общее
		// их количество, посмотрим, сохранили ли мы этот опрос, и голосовали ли мы уже в нем
		axios.get('/api/is-poll-saved/' + this.props.poll.id, {
				onDownloadProgress: () => {
					this.setState({saved_loading_status: 'loading'})
				}
			}).then(({data}) => {
				this.setState({saved: data})
				this.setState({saved_loading_status: 'loaded'})
			}).catch(() => {
				this.setState({saved_loading_status: 'error'})
			})
		axios.get('/api/is-my-voice/' + this.props.poll.id).then(({data}) => {
			this.setState({selected_option: data.option})
			if (data) {
				this.setState({voice_sending_status: 'sended'})
				this.openSocket(this.props.poll.id)
			} else {
				this.setState({voice_sending_status: 'unsended'})
			}
			this.setState({voices_loading_status: 'loaded'})
		})
	}
	
	componentWillUnmount() {
		if(this['pollSocket' + this.props.poll.id] != undefined) {
			this['pollSocket' + this.props.poll.id].close()
        }
	}

    initPollVoices = (id) => {
        const sum = (arr => arr.reduce((partialSum, a) => partialSum + a, 0))
        let count = 0
        axios.get('/api/get-voices/' + id).then(({data}) => {
            count = sum(data)
            this.setState({voices_count: count})
			this.setVoices(data)
        })
    }

    openSocket = (poll_id, resolve_data) => {
        let wsProtocol = ""
        if (window.location.protocol == 'https:') {
            wsProtocol = 'wss://'
        } else {
            wsProtocol = 'ws://'
        }
        if (this['pollSocket' + poll_id] == undefined) {
            this['pollSocket' + poll_id] = new WebSocket(
                wsProtocol + window.location.host + '/ws/poll/' + poll_id)
            this['pollSocket' + poll_id].onclose = () => {
                this['pollSocket' + poll_id] = undefined
            }
            this['pollSocket' + poll_id].onmessage = e => {
                let data = JSON.parse(e.data)
                const operation_type = data.operation
                const selected_option = data.option
                let voiceIndex = document.getElementById('option' + selected_option).getAttribute('data-index')
                let newVoices = this.state.voices
                if (operation_type == "add") {
                    newVoices[voiceIndex]++
                    this.setVoices(newVoices)
                    this.setvoices_count(this.state.voices_count + 1)
                }
                if (operation_type == "delete") {
                    newVoices[voiceIndex]--
                    this.setVoices(newVoices)
                    this.setState({voices_count: this.state.voices_count - 1})
                    this.setState({voice_sending_status: 'unsended'})
                }
                // обновить count и voices в соответствии с типом
            }
            if (resolve_data) {
                this['pollSocket' + this.props.poll.id].onopen = () => {
                    let socket = this['pollSocket' + this.props.poll.id]
                    socket.send(JSON.stringify(resolve_data))
                }
            }
        }
    }

    selectOption = (e) => {
        const id = e.target.getAttribute('data-id')
        this.setState({selected_option: id})
    }

    sendVoice = () => {
        this.voiceOperation('add')
    }

    deleteVoice = () => {
        this.voiceOperation('delete')
    }

    voiceOperation = (operationType) => {
        const selected_option = this.state.selected_option
        const data = {option: selected_option, operation: operationType}
        const socket_send = () => {
            if (operationType == 'add') {
                if (this['pollSocket' + this.props.poll.id] == undefined) {
                    this.openSocket(this.props.poll.id, data)
                } else {
                    this['pollSocket' + this.props.poll.id].send(JSON.stringify(data))
                }
            } else if (operationType == "delete") {
                this['pollSocket' + this.props.poll.id].send(JSON.stringify(data))
            }
        }
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('option', selected_option)
		formData.append('operation', operationType)
		axios.post(window.location.origin + '/api/send-voice', formData).then(({data}) => {
			this.setState({voice_sending_status: 'sended'})
            socket_send()
		}).catch((data) => {
			console.log(data)
			this.setState({voice_sending_status: 'error'})
		})
    }

    setVoices = (data) => {
        this.setState({voices: data})
    }

    savePoll = () => {
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('saved_status', this.state.saved)
		axios.post(window.location.origin + '/api/save-poll/' + this.props.poll.id, formData, {
				onDownloadProgress: () => {
					this.setState({saved_loading_status: 'loading'})
				}
			})
			.then(({data}) => {
				this.setState({saved: data})
				this.setState({saved_loading_status: 'loaded'})
			}).catch((data) => {
				this.setState({saved_loading_status: 'error'})
			})
    }

    render() {
		return (
			<div className="question-field">
				<Header poll={this.props.poll}
					member={this.props.member}
					saved={this.state.saved}
					savePoll={this.savePoll}
					saved_loading_status={this.state.saved_loading_status} />
				<Options options={this.props.poll.options}
					voices_count={this.state.voices_count} voice_sending_status={this.state.voice_sending_status}
					voices={this.state.voices} selectOption={this.selectOption}
					selected_option={this.state.selected_option} />
				<PollFooter poll={this.props.poll}
					voice_sending_status={this.state.voice_sending_status}
					voices_count={this.state.voices_count} sendVoice={this.sendVoice} voices_loading_status={this.state.voices_loading_status}
					deleteVoice={this.deleteVoice} voice_sending_status={this.state.voice_sending_status} />
			</div>
		)
	}
}

export default PollContentField
