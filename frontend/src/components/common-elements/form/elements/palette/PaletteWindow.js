import React from 'react'
import '../../style/palette.css'

class ColorsInput extends React.Component {
	constructor(props) {
		super(props)
		this.wrapperRef = React.createRef()
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside)
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target != document.getElementById('notifications_btn')) {
			this.props.closeWindow()
		}
	}

	render() {
		return (
			<div className="color-select-win" ref={this.wrapperRef}>
				<ul>
					{this.props.colors.map((color, index) => {
						if(color.is_palette) {
							return (
								<li key={index} onClick={this.props.selectColor}>
									<div className={`color-el ${color.type}` + "-block"} data-colorid={color.id}
										 data-colorname={color.type}></div>
								</li>
							)
						}
					})}
				</ul>
			</div>
		)
	}
}

export default ColorsInput
