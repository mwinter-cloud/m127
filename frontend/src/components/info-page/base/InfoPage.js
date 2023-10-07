import React, { Component } from 'react'
import '../styles/info-page.css'
import Header from "../elements/Header"
import SpecialRoomList from "../elements/SpecialRoomList"
import ToAdmin from "../elements/ToAdmin"
import LinkList from "../elements/LinkList"
import Cover from "../elements/Cover"

class InfoPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="info-page">
                <Header/>
                <div className="main-block">
                    <div className="col-1">
                        <Cover/>
                        <LinkList/>
                    </div>
                    <div className="col-2">
                        <SpecialRoomList/>
                        <ToAdmin member={this.props.member}/>
                    </div>
                </div>
            </main>
        )
    }
}

export default InfoPage
