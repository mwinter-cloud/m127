import React, {Component} from "react"
import axios from "axios"
import bluelightsaber from "./bluelightsaber.png"
import captain_phasma from "./captain_phasma.png"

class StarWars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empireVoices: 0,
            republicVoices: 0,
			voicesLoadingStatus: 'undefined',
			voiceSendingStatus: 'undefined',
        }
        this.sendRepublicVoice = this.sendRepublicVoice.bind(this)
        this.sendEmpireVoice = this.sendEmpireVoice.bind(this)
        this.sendVoice = this.sendVoice.bind(this)
        this.sendSocketMsg = this.sendSocketMsg.bind(this)
    }
	
	componentDidMount() {
		axios.get('/api/get-star-wars-voices', {
			onDownloadProgress: () => {
				this.setState({voicesLoadingStatus: 'loading'})
			}
		}).catch(() => {
			this.setState({voicesLoadingStatus: 'error'})
		}).then(({data}) => {
			this.setState({voicesLoadingStatus: 'loaded'})
			if(data.empire_voices){
				this.setState({empireVoices: data.empire_voices})
			}
			if(data.republic_voices){
				this.setState({republicVoices: data.empire_voices})
			}
        })
		let wsProtocol = ""
        if (window.location.protocol == 'https:') {
            wsProtocol = 'wss://'
        } else {
            wsProtocol = 'ws://'
        }
		this.starWarsSocket = new WebSocket(wsProtocol + window.location.host + '/ws/star-wars-poll')
        this.starWarsSocket.onmessage = e => {
            const data = JSON.parse(e.data)
            const side = data['side']
            const voice = {
                'id': id,
                'side': side,
            }
			console.log(voice)
			if(side == 'EM') {
				this.setState({empireVoices: prevState => prevState + 1})
			} else {
				this.setState({republicVoices: prevState => prevState + 1})
			}
		}
	}
	
	componentWillUnmount() {
		this.starWarsSocket.close()
	}
	
	sendRepublicVoice = () => {
		this.sendVoice('RP')
	}
	
	sendEmpireVoice = () => {
		this.sendVoice('EM')
	}
	
	sendSocketMsg = (side) => {
		window.starWarsSocket.send(JSON.stringify({
            'type': 'new_voice',
            'side': side,
        }))
	}
	
	sendVoice = (side) => {
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('side', side)
		axios.post(window.location.origin + '/api/send-star-wars-voice', formData).then(() => {
			this.sendSocketMsg(side)
			this.setState({voiceSendingStatus: 'sended'})
		}).catch((data) => {
			this.setState({voiceSendingStatus: 'error'})
		})
	}
	
	render() {
		if(this.state.voicesLoadingStatus == 'loaded') {
			return(
				<div className="star-wars-container">
					<p>Кто должен победить? (можно кликать сколько угодно раз)</p>
					<div className="options">
						<div className="option" onClick={this.sendRepublicVoice}>
							<img src={bluelightsaber} /> 
							<span className="sidename">Республика</span>
							<span className="voices">{this.state.republicVoices}</span>
						</div>
						<div className="option" onClick={this.sendEmpireVoice}>
							<img src={captain_phasma} /> 
							<span className="sidename">Империя</span>
							<span className="voices">{this.state.empireVoices}</span>
						</div>
						<span className="vs">vs</span>
					</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default StarWars