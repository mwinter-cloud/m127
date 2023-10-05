import React, { Component } from 'react'
import '../../styles/create-profile.css'
import ProfileCreateForm from "../form/ProfileCreateForm"

class ProfileCreatePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="profile-create-page">
                <div className="container">
                    <div className="moderation-card">
                        <ProfileCreateForm/>
                    </div>
                </div>
            </main>
        )
    }
}

export default ProfileCreatePage
