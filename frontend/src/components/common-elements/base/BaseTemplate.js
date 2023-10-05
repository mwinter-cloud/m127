import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../../common-elements/base/header/Header"

class BaseTemplate extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Header/>
                <Outlet/>
            </>
        )
    }
}

export default BaseTemplate
