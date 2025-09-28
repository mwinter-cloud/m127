import React, {useState, useEffect} from "react"
import axios from "axios"
import ProfileBlock from "./ProfileBlock"
import remove_array_item from "../../../../special-functions/remove-array-item"

export const BlackList = () => {
	const [profiles, setProfiles] = useState([])
	
	useEffect(() => {
		axios.get(window.location.origin + '/api/get-blocked-profiles').then(({data}) => {
            setProfiles(data)
        })
	}, [])

    const restoreMember = (member_id) => {
        setProfiles(remove_array_item(profiles, member_id))
    }

	return (
		<main className="big-container reports-section black-list">
			<h3>В блоке находятся:</h3>
			<ul>
				{profiles.length > 0 ?
					(profiles.map((profile, index) => {
						return (
							<ProfileBlock key={index} profile={profile} restoreMember={restoreMember} />
						)
				})) : (<p>Е-е, никто не заблокирован!</p>)}
			</ul>
		</main>
	)
}
