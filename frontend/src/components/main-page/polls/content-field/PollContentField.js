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
			savedLoadingStatus: 'undefined',
            voice_sended: 0,
            voices_count: 'undefined',
            selected_option: 0,
            voiceSendingStatus: 'undefined',
            voices: [],
			voicesLoadingStatus: 'undefined'
        }
        this.selectOption = this.selectOption.bind(this)
        this.sendVoice = this.sendVoice.bind(this)
        this.deleteVoice = this.deleteVoice.bind(this)
        this.voiceOperation = this.voiceOperation.bind(this)
        this.setVoicesCount = this.setVoicesCount.bind(this)
        this.setVoiceSendedStatus = this.setVoiceSendedStatus.bind(this)
        this.initPollVoices = this.initPollVoices.bind(this)
        this.openSocket = this.openSocket.bind(this)
    }
	
	componentDidMount() {
		this.initPollVoices(this.props.poll.id) // запишем количество голосов для вариантов и подсчитаем общее
		// их количество, посмотрим, сохранили ли мы этот опрос, и голосовали ли мы уже в нем
		axios.get('/api/is-poll-saved/' + this.props.poll.id, {
				onDownloadProgress: () => {
					this.setState({savedLoadingStatus: 'loading'})
				}
			}).then(({data}) => {
				this.setState({saved: data})
				this.setState({savedLoadingStatus: 'loaded'})
			}).catch(() => {
				this.setState({savedLoadingStatus: 'error'})
			})
		axios.get('/api/is-my-voice/' + this.props.poll.id).then(({data}) => {
			this.setState({selected_option: data.option})
			this.setVoiceSendedStatus(data)
			if (data) {
				this.openSocket(this.props.poll.id)
			}
			this.setState({voicesLoadingStatus: 'loaded'})
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
            this.setVoicesCount(count)
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
                let voice_index = document.getElementById('option' + selected_option).getAttribute('data-index')
                let new_voices = this.state.voices
                if (operation_type == "add") {
                    new_voices[voice_index]++
                    this.setVoices(new_voices)
                    this.setVoicesCount(this.state.voices_count + 1)
                }
                if (operation_type == "delete") {
                    new_voices[voice_index]--
                    this.setVoices(new_voices)
                    this.setVoicesCount(this.state.voices_count - 1)
                    this.setVoiceSendedStatus(0)
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

    voiceOperation = (operation_type) => {
        const selected_option = this.state.selected_option
        const data = {option: selected_option, operation: operation_type}
        const socket_send = () => {
            if (operation_type == 'add') {
                if (this['pollSocket' + this.props.poll.id] == undefined) {
                    this.openSocket(this.props.poll.id, data)
                } else {
                    this['pollSocket' + this.props.poll.id].send(JSON.stringify(data))
                }
            } else if (operation_type == "delete") {
                this['pollSocket' + this.props.poll.id].send(JSON.stringify(data))
            }
        }
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('option', selected_option)
		formData.append('operation', operation_type)
		axios.post(window.location.origin + '/api/send-voice', formData).then(({data}) => {
			this.setVoiceSendedStatus(1)
            socket_send()
		}).catch(() => {
			this.setState({voiceSendingStatus: 'error'})
		})
    }

    setVoices = (data) => {
        this.setState({voices: data})
    }

    setVoicesCount = (num) => {
        this.setState({voices_count: num})
    }

    setVoiceSendedStatus = (status) => {
        if (status != 0) {
            this.setState({voice_sended: 1})
        } else {
            this.setState({voice_sended: 0})
        }
    }

    savePoll = () => {
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('saved_status', this.state.saved)
		axios.post(window.location.origin + '/api/save-poll/' + this.props.poll.id, formData, {
				onDownloadProgress: () => {
					this.setState({savedLoadingStatus: 'loading'})
				}
			})
			.then(({data}) => {
				this.setState({saved: data})
				this.setState({savedLoadingStatus: 'loaded'})
			}).catch((data) => {
				this.setState({savedLoadingStatus: 'error'})
			})
    }

    render() {
		return (
			<div className="question-field">
				<Header poll={this.props.poll}
					member={this.props.member}
					saved={this.state.saved}
					savePoll={this.savePoll}
					savedLoadingStatus={this.state.savedLoadingStatus} />
				<Options options={this.props.poll.options}
					voices_count={this.state.voices_count} voice_sended={this.state.voice_sended}
					voices={this.state.voices} selectOption={this.selectOption}
					selected_option={this.state.selected_option} />
				<PollFooter poll={this.props.poll}
					voice_is_sended={this.state.voice_sended}
					voices_count={this.state.voices_count} sendVoice={this.sendVoice} voicesLoadingStatus={this.state.voicesLoadingStatus}
					deleteVoice={this.deleteVoice} voiceSendingStatus={this.state.voiceSendingStatus} />
			</div>
		)
	}
}

export default PollContentField
