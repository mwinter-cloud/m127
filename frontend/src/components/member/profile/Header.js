import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="main-profile-header">
                {this.props.cover? (<img src={this.props.cover} className="cover"/>):(<div className="cover-block"></div>)}
                <div className="user-info">
                    <img src={this.props.avatar?this.props.avatar:""} className="avatar"/>
                    <h3 className={this.props.color?this.props.color.type:null}>{this.props.name}</h3>
                </div>
            </header>
        )
    }
}

export default Header
