import React, {Component} from 'react'
import {Option} from "./Option"

export const Options = ({options, voices, voices_count, selected_option, voice_sending_status, selectOption}) => {
	return (
		<div className="poll-options">
			<ul className={voice_sending_status == 'sended' ? "sended-voice-poll" : "empty-poll"}>
				{options?.map((option, index) => {
					return (
						<Option index={index} key={index}
							option={option}
							selectOption={selectOption}
							voices_count={voices_count}
							voices={voices[index]}
							selected_option={selected_option}
							voice_sending_status={voice_sending_status} />
					)
				})
				}
			</ul>
			{voice_sending_status == 'error' ? (<p className="error-msg">Отправить голос не удалось.</p>) : null}
		</div>
	)
}
