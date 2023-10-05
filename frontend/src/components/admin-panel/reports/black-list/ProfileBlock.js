import React, { Component } from 'react'

class ProfileBlock extends Component {
    constructor(props) {
        super(props)
        this.restoreMember = this.restoreMember.bind(this)
    }

    restoreMember = () => {
        const profile_id = this.props.profile.id
        const restore = () => {
            this.props.restoreMember(profile_id)
        }
        $.ajax({
            type: 'post',
            url: window.location.origin + '/api/restore-member',
            cache: false,
            data: {profile_id: profile_id},
            success: function () {
                restore()
            },
            error: function (xhr, status, error) {
                console.log('Ошибка блокировки участника')
            }
        })
    }

    render() {
        return (
            <li>
                <h4>{this.props.profile.name}</h4>
                <span className="text-btn" onClick={this.restoreMember}><i className="el-icon-refresh-left"></i> восстановить</span>
            </li>
        )
    }
}

export default ProfileBlock
