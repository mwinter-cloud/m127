import React, { Component } from 'react'

class Cover extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                {this.props.cover ?
                    (<div className="cover"></div>) : null}
            </>
        )
    }
}

export default Cover
