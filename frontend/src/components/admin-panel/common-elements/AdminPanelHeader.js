import React, { Component } from 'react'
import {Link} from "react-router-dom"

class AdminPanelHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="admin-page-header">
                <div className="moderation-title">
                    <Link to="/">
                        <img
                        src="https://sun9-23.userapi.com/impg/_ETpQ669o1tzaKUYjlQIU8V9_L_o2dRGfeUKVw/mFHmYEL2u2A.jpg?size=1280x862&quality=95&sign=7d3d4f1eb3d6166007f7f211adceae09&type=album"/>
                    </Link>
                    <h1>Админ-панель</h1>
                </div>
                <ul id="admin_panel_menu">
                    <li><Link to="/admin-panel/cite-settings" className={this.props.active_menu_item=='cite-settings'?'active':""} id="cite_settings_link">Оформление</Link></li>
                    <li><Link to="/admin-panel/moderators" id="moderators_link" className={this.props.active_menu_item=='moderators'?'active':""}>Модераторы</Link></li>
                    <li><Link to="/admin-panel/reports" id="reports_link" className={this.props.active_menu_item=='reports'?'active':""}>Жалобы</Link></li>
                    <li><Link to="/admin-panel/workplan" id="workplan_link" className={this.props.active_menu_item=='workplan'?'active':""}>План работ</Link></li>
                    <li><Link to="/admin-panel/updates" id="updates_link" className={this.props.active_menu_item=='updates'?'active':""}>Обновления</Link></li>
                    <li><Link to="/admin-panel/guide/1" className="guide-link" id="guide_link" className={this.props.active_menu_item=="guide"?"guide-link active":"guide-link"}>Руководство</Link></li>
                </ul>
            </header>
        )
    }
}

export default AdminPanelHeader
