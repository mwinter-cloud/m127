import React, { Component } from 'react'
import ModeratorList from "../elements/main/ModeratorList"
import Aside from "../elements/aside/Aside"

class ModeratorsPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.set_menu_item('moderators')
  }

  render() {
    return (
        <main className="big-container flex moderators-section">
          <Aside is_admin={this.props.member.profile.is_admin}/>
          <ModeratorList is_admin={this.props.member.profile.is_admin}/>
        </main>
    )
  }
}

export default ModeratorsPage
