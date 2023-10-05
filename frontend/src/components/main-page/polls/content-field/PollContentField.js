import React, { Component } from 'react'
import axios from "axios"
import Header from "./elements/Header"
import Options from "./elements/Options"
import PollFooter from "./elements/PollFooter"

class PollsContentField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: "undefined",
            voice_sended: 0,
            voices_count: 'undefined',
            selected_option: 0,
            voices: []
        }
        this.selectOption = this.selectOption.bind(this)
        this.sendVoice = this.sendVoice.bind(this)
        this.deleteVoice = this.deleteVoice.bind(this)
        this.voiceOperation = this.voiceOperation.bind(this)
        this.setSavedStatus = this.setSavedStatus.bind(this)
        this.setVoicesCount = this.setVoicesCount.bind(this)
        this.setVoiceSendedStatus = this.setVoiceSendedStatus.bind(this)
        this.initPollVoices = this.initPollVoices.bind(this)
        this.openSocket = this.openSocket.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const set_saved_status = (status) => {
            this.setSavedStatus(status)
        }
        const init_poll_voices = (poll_id) => {
            this.initPollVoices(poll_id)
        }
        const open_socket = (poll_id) => {
            this.openSocket(poll_id)
        }
        const set_selected_option = (id) => {
            this.setState({selected_option: id})
        }
        if (nextProps.poll != this.state.poll) {
            // закрыть сокет прошлого опроса
            if (this['pollSocket' + this.props.poll.id] != undefined) {
                this['pollSocket' + this.props.poll.id].close()
            }
            init_poll_voices(nextProps.poll.id) // запишем количество голосов для вариантов и подсчитаем общее
            // их количество, посмотрим, сохранили ли мы этот опрос, и голосовали ли мы уже в нем
            axios.get('http://' + window.location.host + '/api/is-poll-saved/' + nextProps.poll.id).then(res => {
                set_saved_status(res.data)
            })
            axios.get('/api/is-my-voice/' + nextProps.poll.id).then(res => {
                set_selected_option(res.data.option)
                this.setVoiceSendedStatus(res.data)
                if (res.data) {
                    open_socket(nextProps.poll.id)
                }
            })
        }
    }

    initPollVoices = (id) => {
        let set_voices = (voices) => {
            this.setVoices(voices)
        }
        const set_voices_count = (num) => {
            this.setVoicesCount(num)
        }
        const sum = (arr => arr.reduce((partialSum, a) => partialSum + a, 0))
        let count = 0
        axios.get('/api/get-voices/' + id).then(res => {
            let voices = res.data
            count = sum(voices)
            set_voices_count(count)
            set_voices(voices)
        })
    }

    openSocket = (poll_id, resolve_data) => {
        if (this['pollSocket' + poll_id] == undefined) {
            this['pollSocket' + poll_id] = new WebSocket(
                'ws://' + window.location.host + '/ws/poll/' + poll_id)
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
            if (operation_type == "add") {
                if (this['pollSocket' + this.props.poll.id] == undefined) {
                    this.openSocket(this.props.poll.id, data)
                } else {
                    this['pollSocket' + this.props.poll.id].send(JSON.stringify(data))
                }
            } else if (operation_type == "delete") {
                this['pollSocket' + this.props.poll.id].send(JSON.stringify(data))
            }
        }
        const set_voice_sended = () => {
            this.setVoiceSendedStatus(1)
        }
        $.ajax({
            type: 'post',
            url: '/api/send-voice',
            cache: false,
            data: data,
            success: function (data) {
                if (data) {
                    set_voice_sended()
                    socket_send()
                }
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    setVoices = (data) => {
        this.setState({voices: data})
    }

    setVoicesCount = (num) => {
        this.setState({voices_count: num})
    }

    setSavedStatus = (status) => {
        this.setState({saved: status})
    }

    setVoiceSendedStatus = (status) => {
        if(status!=0) {
            this.setState({voice_sended: 1})
        } else {
            this.setState({voice_sended: 0})
        }
    }

    savePoll = () => {
        const set_saved_status = (data) => {
            this.setSavedStatus(data)
        }
        let saved_status = this.state.saved
        $.ajax({
            type: 'post',
            url: '/api/save-poll/' + this.props.poll.id,
            cache: false,
            data: {saved_status: saved_status},
            success: function (data) {
                set_saved_status(data)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    render() {
        return (
            <div className={this.props.section != 'question' ? 'hide' : "question-field "}>
                {(() => {
                    if (this.props.poll.author && this.state.voice_sended != "undefined") {
                        return (
                            <Header poll={this.props.poll}
                                    member={this.props.member}
                                    saved={this.state.saved}
                                    savePoll={this.savePoll}/>
                        )
                    }
                })()}
                {(() => {
                    if (this.state.voices_count != 'undefined') {
                        return (
                            <Options options={this.props.poll.options} member={this.props.member}
                                     voices_count={this.state.voices_count} voice_sended={this.state.voice_sended}
                                     voices={this.state.voices} selectOption={this.selectOption}
                                     selected_option={this.state.selected_option}/>
                        )
                    }
                })()}
                {(() => {
                    if (this.state.voices_count != 'undefined') {
                        return (
                            <PollFooter setComments={this.props.setComments} poll={this.props.poll}
                                        member={this.props.member} voice_sended={this.state.voice_sended}
                                        voices_count={this.state.voices_count} sendVoice={this.sendVoice}
                                        deleteVoice={this.deleteVoice}/>
                        )
                    }
                })()}
            </div>
        )
    }
}

export default PollsContentField
