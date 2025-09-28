import React, {Component} from "react"
import AdminPanelHeader_wrap from "../../store/wraps/admin-panel/AdminPanelHeader_wrap"
import {Outlet} from "react-router-dom"
import "./styles/admin-panel.css"
import MobileAdminPanelHeader_wrap from "../../store/wraps/admin-panel/MobileAdminPanelHeader_wrap"
import MediaQuery from "react-responsive"

class AdminPanelStart extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <MediaQuery minWidth={801}>
                    <AdminPanelHeader_wrap/>
                </MediaQuery>
                <MediaQuery maxWidth={800}>
                    <MobileAdminPanelHeader_wrap/>
                </MediaQuery>
                <Outlet/>
            </>
        )
    }
}

export default AdminPanelStart
