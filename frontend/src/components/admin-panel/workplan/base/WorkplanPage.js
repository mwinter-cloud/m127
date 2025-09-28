import React, { Component } from 'react'
import List from "../elements/List"
import Header from "../elements/Header"

class WorkplanPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.set_menu_item('workplan')
  }

  render() {
    return (
        <main className="big-container updates-section workplan-page">
          <Header/>
          <List member={this.props.member}/>
        </main>
    )
  }
}

export default WorkplanPage
