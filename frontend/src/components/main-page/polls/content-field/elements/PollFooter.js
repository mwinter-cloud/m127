import React from 'react'

export const PollFooter = ({voice_sending_status, deleteVoice, sendVoice, voices_count, voices_loading_status}) => {
	return (
		<footer>
			{(() => {
				if(voices_loading_status == 'loaded') {
					return (
						<>
							{voice_sending_status == 'sended' ? (<p onClick={deleteVoice} className="revoice">Переголосовать</p>) : 
							(<button className="send-btn" onClick={sendVoice}>Ответить</button>)}
							<p>Голосов отправлено: {voices_count != 'undefined' && voices_count}</p>
						</>
					)
				}
			})()}
		</footer>
	)
}
