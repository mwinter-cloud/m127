import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import PollsFilter from "./filter/PollsFilter"
import MediaQuery from 'react-responsive'

class MainPollsTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open_menu: 0,
        }
        this.openMenu = this.openMenu.bind(this)
    }

    openMenu = () => {
        this.setState({open_menu: this.state.open_menu ? 0 : 1})
    }

    render() {
        return (
            <main className="main-page polls-page">
                <div className="flex container">
                    <MediaQuery minWidth={801}>
                        <aside className="col1">
                            <PollsFilter/>
                        </aside>
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        {this.state.open_menu ? (
                            <div className="col1">
                                <PollsFilter closeMenu={this.openMenu}/>
                            </div>) : null}
                        <div className="poll-section-btn" onClick={this.openMenu}>
                            <div className="section-title">
                                <i className="el-icon-copy-document"></i> {this.state.open_menu ? ('меню') : ('опрос')}
                            </div>
                        </div>
                    </MediaQuery>
                        {this.state.open_menu ? null : (<Outlet/>)}
                </div>
            </main>
        )
    }
}

export default MainPollsTemplate
