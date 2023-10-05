import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="comments-header">
                <div className="back-arrow" onClick={this.props.setQuestion}><i className="el-icon-arrow-left"></i></div>
                <h3>{this.props.question}</h3>
            </header>
        )
    }
}

export default Header
