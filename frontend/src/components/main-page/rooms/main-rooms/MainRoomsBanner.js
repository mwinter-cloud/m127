import React, { Component } from 'react'
import Carousel from "./Carousel"
import InfoBlock from "./InfoBlock"

class MainRoomsBanner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="cite-top container">
                <Carousel/>
                <div className="aside">
                    <InfoBlock/>
                </div>
            </header>
        )
    }
}

export default MainRoomsBanner
