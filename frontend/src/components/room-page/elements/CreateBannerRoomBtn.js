import React, { Component } from 'react'

class CreateBannerRoomBtn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.member.profile.is_admin) {
            return (
                <>
                    <li className="underline-hover blue-text" onClick={this.props.openBannerForm}>
                        Добавить в главные
                    </li>
                </>
            )
        } else { return null }
    }
}

export default CreateBannerRoomBtn
