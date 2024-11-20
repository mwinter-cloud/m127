import React from 'react'

export const PollFooter = ({voice_is_sended, deleteVoice, sendVoice, voices_count, voicesLoadingStatus}) => {
	return (
		<footer>
			{(() => {
				if(voicesLoadingStatus == 'loaded') {
					return (
						<>
							<div className="voice-send-block">
								{voice_is_sended ? (<p onClick={deleteVoice} className="revoice">Переголосовать</p>) : 
								(<button className="send-btn" onClick={sendVoice}>Ответить</button>)}
							</div>
							<p>Голосов отправлено: {voices_count}</p>
						</>
					)
				}
			})()}
		</footer>
	)
}
