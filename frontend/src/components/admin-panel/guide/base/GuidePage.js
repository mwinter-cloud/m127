import React, {useEffect} from 'react'
import {Menu} from "../elements/Menu"
import SectionMain from "../elements/SectionMain"

export const GuidePage = ({set_menu_item, active_section}) => {
	useEffect(() => {
		set_menu_item('guide')
	}, [])
	
	return (
		<div className="big-container guide-section">
			<Menu active_section={active_section} />
			<SectionMain section={active_section} />
		</div>
	)
}