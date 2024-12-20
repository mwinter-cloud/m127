import React, {Component, useState, useEffect} from "react"
import axios from "axios"
import bluelightsaber from "./bluelightsaber.png"
import captain_phasma from "./captain_phasma.png"

export const StarWars = () => {
	const [empireVoices, setEmpireVoices] = useState(0)
	const [republicVoices, setRepublicVoices] = useState(0)
	const [voicesLoadingStatus, setVoicesLoadingStatus] = useState('undefined')
	const [voicesSendingStatus, setVoiceSeindingStatus] = useState('undefined')
	
	
	useEffect(() => {
		axios.get('/api/get-star-wars-voices', {
			onDownloadProgress: () => {
				setVoicesLoadingStatus('loading')
			}
		}).catch(() => {
			setVoicesLoadingStatus('error')
		}).then(({data}) => {
			setVoicesLoadingStatus('loaded')
			if(data.empire_voices){
				setEmpireVoices(data.empire_voices)
			}
			if(data.republic_voices){
				setRepublicVoices(data.republic_voices)
			}
        })
		let wsProtocol = ""
        if (window.location.protocol == 'https:') {
            wsProtocol = 'wss://'
        } else {
            wsProtocol = 'ws://'
        }
		window.starWarsSocket = new WebSocket(wsProtocol + window.location.host + '/ws/star-wars-poll')
        window.starWarsSocket.onmessage = e => {
            const data = JSON.parse(e.data)
            const side = data['side']
            const voice = {
                'id': id,
                'side': side,
            }
			console.log(voice)
			if(side == 'EM') {
				setEmpireVoices(empireVoices+1)
			} else {
				setRepublicVoices(republicVoices+1)
			}
		}
			
		return function () {
			window.starWarsSocket.close()
		};
	}, [])
	
	const sendRepublicVoice = () => {
		sendVoice('RP')
	}
	
	const sendEmpireVoice = () => {
		sendVoice('EM')
	}
	
	const sendSocketMsg = (side) => {
		window.starWarsSocket.send(JSON.stringify({
            'type': 'new_voice',
            'side': side,
        }))
	}
	
	const sendVoice = (side) => {
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('side', side)
		axios.post(window.location.origin + '/api/send-star-wars-voice', formData).then(() => {
			sendSocketMsg(side)
			setVoiceSeindingStatus('sended')
		}).catch((data) => {
			setVoiceSeindingStatus('error')
		})
	}
	
	if(voicesLoadingStatus == 'loaded') {
		return(
			<div className="star-wars-container">
				<p>Кто должен победить? (можно кликать сколько угодно раз)</p>
				<div className="options">
					<div className="option" onClick={sendRepublicVoice}>
						<img src={bluelightsaber} /> 
						<span className="sidename">Республика</span>
						<span className="voices">{republicVoices}</span>
					</div>
					<div className="option" onClick={sendEmpireVoice}>
						<img src={captain_phasma} /> 
						<span className="sidename">Империя</span>
						<span className="voices">{empireVoices}</span>
					</div>
					<span className="vs">vs</span>
				</div>
			</div>
		)
	} else {
		return null
	}
}
