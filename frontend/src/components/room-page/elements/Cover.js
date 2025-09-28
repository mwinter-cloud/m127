import React, { Component } from 'react'

class Cover extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.cover) {
            return (
                <img className="room-cover" src={this.props.cover}/>
            )
        } else {
            return null
        }
    }
}

export default Cover
