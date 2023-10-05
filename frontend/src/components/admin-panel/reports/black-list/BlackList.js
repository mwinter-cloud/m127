import React, { Component } from 'react'
import axios from "axios"
import ProfileBlock from "./ProfileBlock"
import remove_array_item from "../../../../special-functions/remove-array-item"

class BlackList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: []
        }
        this.restoreMember = this.restoreMember.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-blocked-profiles').then(res => {
            this.setState({profiles: res.data})
        })
    }

    restoreMember = (member_id) => {
        const new_list = remove_array_item(this.state.profiles, member_id)
        this.setState({profiles: new_list})
    }

    render() {
        return (
            <main className="big-container reports-section black-list">
                <h3>В блоке находятся:</h3>
                <ul>
                    {this.state.profiles.length!=0 ?
                        (this.state.profiles.map((profile, index) => {
                        return (<ProfileBlock key={index} profile={profile} restoreMember={this.restoreMember}/>)
                    })) : (<p>Е-е-е, никто не заблокирован!</p>)}
                </ul>
            </main>
        )
    }
}

export default BlackList
