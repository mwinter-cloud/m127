import React, { Component } from 'react'
import parse from "html-react-parser"

class ProfilePost extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
			<article className="post">
				<main>
					{this.props.title?(<h2>{this.props.title}</h2>):null}
					{this.props.text?(<p>{parse(this.props.text)}</p>):null}
					{this.props.image?(<img src={this.props.image}/>):null}
				</main>
			</article>
        )
    }
}

export default ProfilePost
