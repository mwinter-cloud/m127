import React, { Component } from 'react'
import TagFilter from "../../../common-elements/form/elements/tag-filter/TagFilter"

class RoomListAside extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col1">
                <TagFilter popular_tags="true" tags={this.props.tags} items="rooms" onTagSelect={this.props.onTagSelect}/>
            </div>
        )
    }
}

export default RoomListAside
