import React from 'react'
import '../../style/palette.css'
import PaletteWindow from "./PaletteWindow"

class ColorInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			palette_window: 0,
			selected_color_name: "gray",
		}
		this.selectColor = this.selectColor.bind(this)
		this.openPaletteWindow = this.openPaletteWindow.bind(this)
	}
	
	componentDidMount() {
		this.props.setColor(17)
		this.setState({selected_color_name: 'gray'})
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.initColor != this.props.initColor) {
			if(nextProps.initColor) {
				this.props.setColor(nextProps.initColor.id)
				this.setState({selected_color_name: nextProps.initColor.type})
			}
		}
	}

	selectColor = (e) => {
		const colorname = e.target.getAttribute('data-colorname')
		const color_id = e.target.getAttribute('data-colorid')
		this.props.setColor(color_id)
		this.setState({selected_color_name: colorname})
		this.openPaletteWindow()
	}

	openPaletteWindow = () => {
		this.setState({palette_window: this.state.palette_window?0:1})
	}

	render() {
		return (
			<div className="inputWrapper">
				<label><span>Цвет</span></label>
				<div className="color-select-block">
					<div className={this.state.selected_color_name + "-block selected-color"}> = ^ᴗ^ =</div>
					<div onClick={this.openPaletteWindow} className="open-palette-btn">Выбрать цвет</div>
					{this.state.palette_window ?
						(<PaletteWindow colors={this.props.colors} selectColor={this.selectColor}
						closeWindow={this.openPaletteWindow}/>) : null}
				</div>
			</div>
		)
	}
}

export default ColorInput
