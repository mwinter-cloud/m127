import React, { Component } from 'react'
import InviteCreator from "./InviteCreator"

class LinkList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="social-menu-ul">
                <InviteCreator invite_image={this.props.invite_image}/>
                <li><a href="../agreement" target="_blank">Соглашение</a></li>
                <li><a href="../admin-panel/guide/2" target="_blank">Руководство по использованию</a></li>
                <li><a href="../admin-panel/guide/1" target="_blank">Идеи сайта</a></li>
            </ul>
        )
    }
}

export default LinkList
