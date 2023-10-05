import React, { Component } from 'react'
import Colorline from "./Colorline"
import MainHeader_wrap from "../../../../store/wraps/base/MainHeader_wrap"
import MobileMainHeader_wrap from "../../../../store/wraps/base/MobileMainHeader_wrap"
import MediaQuery from 'react-responsive'

class MainHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Colorline/>
    		    <MediaQuery maxWidth={800}>
    			    <MobileMainHeader_wrap/>
    			</MediaQuery>
    		    <MediaQuery minWidth={801}>
                    <MainHeader_wrap/>
    			</MediaQuery>
            </>
        )
    }
}

export default MainHeader
