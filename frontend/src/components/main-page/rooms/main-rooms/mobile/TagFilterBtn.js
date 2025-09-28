import React, { Component } from 'react'
import {RoomListAside} from "../../room-list/RoomListAside"
import SmallWindow from "../../../../common-elements/windows/SmallWindow"

class TagFilterBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags_status: 'disabled'
        }
        this.changeTagStatus = this.changeTagStatus.bind(this)
    }

    changeTagStatus = () => {
        this.setState({tags_status: this.state.tags_status == 'active' ? 'disabled' : 'active'})
    }

    render() {
        return (
            <>
                {this.state.show_tags == 'active' && (<SmallWindow closeWindow={this.changeTagStatus}
					children={<RoomListAside tags={this.props.tags}
					onTagSelect={this.props.onTagSelect} />}
					title="Теги" />) }
                <div className="add-btn" onClick={this.changeTagStatus}>#</div>
            </>
        )
    }
}

export default TagFilterBtn
