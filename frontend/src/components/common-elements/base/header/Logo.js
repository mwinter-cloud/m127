import React from 'react'
import '../../../../../static/frontend/images/small-logo.png'
import MediaQuery from 'react-responsive'

class Logo extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="logo-block">
				<img src="../../../../../static/frontend/images/small-logo.png" className="small-logo"/>
				<MediaQuery minWidth={801}>
					<span className="citenamelogo">Почта ветров</span>
				</MediaQuery>
			</div>
		)
	}
}

export default Logo
