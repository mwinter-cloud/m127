import React, { Component } from 'react'
import AddedModeratorCard from "./AddedModeratorCard"

class AddedModeratorsBlock extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <>
                {this.props.moderators.map((moderator, index) => {
                    return (
                        <AddedModeratorCard moderator={moderator} removeModerator={this.props.removeModerator} key={index}/>
                    )
                })}
            </>
        )
    }
}

export default AddedModeratorsBlock
