import React, { Component } from 'react'
import RoomListAside from "../../room-list/RoomListAside"
import SmallWindow from "../../../../common-elements/windows/SmallWindow"

class TagFilterBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_tags: 0
        }
        this.showTags = this.showTags.bind(this)
    }

    showTags = () => {
        this.setState({show_tags: this.state.show_tags ? 0 : 1})
    }

    render() {
        return (
            <>
                {this.state.show_tags ? (<SmallWindow closeWindow={this.showTags}
                                                      children={<RoomListAside tags={this.props.tags}
                                                          onTagSelect={this.props.onTagSelect}/>}
                                                      title="Теги"/>)
                    : null}
                <div className="add-btn" onClick={this.showTags}>#</div>
            </>
        )
    }
}

export default TagFilterBtn
