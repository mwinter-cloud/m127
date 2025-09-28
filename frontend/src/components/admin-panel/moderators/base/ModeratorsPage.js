import React, {useEffect} from "react"
import ModeratorList from "../elements/main/ModeratorList"
import Aside from "../elements/aside/Aside"

export const ModeratorsPage = ({set_menu_item, member}) => {
	useEffect(() => {
		set_menu_item('moderators')
	}, [])

	return (
		<main className="big-container flex moderators-section">
			<Aside is_admin={member.profile.is_admin} />
			<ModeratorList is_admin={member.profile.is_admin} />
		</main>
	)
}