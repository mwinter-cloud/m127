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
                    {this.props.avatar?(<img src={this.props.avatar} className="avatar"/>) : null}
                    <h3 className={this.props.color?this.props.color.type:null}>{this.props.name}</h3>
                    {this.props.is_admin?(<div className="admin-icon">💫</div>):null}
                </div>
            </header>
        )
    }
}

export default Header
