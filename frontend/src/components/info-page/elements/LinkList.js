import React, { Component } from 'react'
import InviteCreator from "./InviteCreator"

class LinkList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="social-menu-ul">
                <InviteCreator/>
                <li><a href="../agreement" target="_blank">Соглашение</a> -> его <a target="_blank"
                                                                                          href="../room/34">обсуждение</a>
                </li>
                <li><a href="../admin-panel/guide/2" target="_blank">Описание приложения</a></li>
                <li><a href="../room/35" target="_blank">Объявления</a></li>
                <li><a href="../room/38" target="_blank">Общение модераторов</a></li>
            </ul>
        )
    }
}

export default LinkList
