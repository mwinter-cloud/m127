import React from 'react'
import TagFilter from "../../../common-elements/form/elements/tag-filter/TagFilter"

export const RoomListAside = ({tags, onTagSelect}) => {
	return (
		<aside className="col1">
			<TagFilter popular_tags="true" tags={tags} items="rooms" onTagSelect={onTagSelect}/>
		</aside>
	)
}
