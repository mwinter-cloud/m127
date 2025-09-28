import React from 'react'
import '../../style/colors-block.css'

class ColorsBlock extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			colors: []
		}
		this.selectColor = this.selectColor.bind(this)
	}

	selectColor = (e) => {
		const color = e.target.getAttribute('data-colorname')
		this.props.selectColor(color)
	}

	render() {
		return (
			<ul className="colors-list">
				{this.props.colors.map((color, index) => {
					if(color.is_palette) {
						return (
							<li key={index} onClick={this.selectColor}>
								<div className={`color-el ${color.type}` + "-block"} data-colorname={color.type}></div>
							</li>
						)
					}
				})}
			</ul>
		)
	}
}

export default ColorsBlock
