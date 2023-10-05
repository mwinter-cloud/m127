import React, { Component } from 'react'
import Menu from "../elements/Menu"
import SectionMain from "../elements/SectionMain"

class GuidePage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.set_menu_item('guide')
    }

    render() {
        return (
            <div className="big-container guide-section">
                <Menu active_section={this.props.active_section}/>
                <SectionMain section={this.props.active_section}/>
            </div>
        )
    }
}

export default GuidePage
