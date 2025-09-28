import React, {useState, useEffect} from 'react'

export const Option = ({voice_sending_status, voices, voices_count, option, index, selected_option, selectOption}) => {
    const [width, setWidth] = useState('undefined')
	
	useEffect(() => {
		if (voices) {
			const width = (voices / voices_count) * 100 + '%'
			setWidth(width)
		} else {
			setWidth('undefined')
		}
	}, [voices, voices_count])

	if (voice_sending_status == 'sended') {
		return (
			<li data-id={option.id} data-index={index} id={'option' + option.id}>
				{option.text} {selected_option == option.id ? (<div className='el-icon-check'></div>) : null}
				<div className="progress"
					 style={width != 'undefined' ? ({width: width}) : ({width: 0})}>
				</div> 
			</li>
		)
	} else {
		return (
			<li data-id={option.id} data-index={index} id={'option' + option.id}
				onClick={selectOption}
				className={selected_option == option.id ? 'selected-option' : null}>
				{option.text}
			</li>
		)
	}
}
