import React from 'react'

class SpottiStickersWindow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stickers: ['spotti1.png', 'spotti2.png', 'spotti3.png',
				'spotti4.png', 'spotti5.png', 'spotti6.png',
				'spotti7.png', 'spotti8.png', 'spotti9.png',
				'spotti10.png', 'spotti11.png', 'spotti12.png',
				'spotti13.png', 'spotti14.png', 'spotti15.png',
				'spotti16.png', 'spotti17.png', 'spotti18.png',
				'spotti19.png', 'spotti20.png', 'spotti21.png',
				'spotti22.png', 'spotti23.png', 'spotti24.png',
				'spotti25.png', 'spotti26.png', 'spotti27.png',
				'spotti28.png', 'spotti29.png',
				'spotti30.png', 'spotti31.png', 'spotti32.png',
				'spotti33.png', 'spotti34.png', 'spotti35.png',
				'spotti36.png', 'spotti37.png', 'spotti38.png',
				'spotti39.png'],
		}
		this.addSticker = this.addSticker.bind(this)
	}

	addSticker = (e) => {
		//добавим элемент в div contenteditable
		let img = e.target.cloneNode(true)
		let div_editable = document.getElementById(this.props.div_editable_name)
		div_editable.focus()
		let selection = window.getSelection(),
			range = selection.getRangeAt(0),
			temp = document.createElement('div'),
			insertion = document.createDocumentFragment()
		temp.appendChild(img)
		while (temp.firstChild) {
			insertion.appendChild(temp.firstChild)
		}
		range.deleteContents()
		range.insertNode(insertion)
		selection.collapseToEnd()
		let event = new Event('input', {
			bubbles: true,
			cancelable: true,
		})
		div_editable.dispatchEvent(event)
	}

	render() {
		return (
			<div className="stickers-block">
				<ul>
					{this.state.stickers.map((sticker, index) => {
						return (
							<li key={index}><img src={"../../../../../../static/frontend/spotti-stickers/"+sticker}
												 onClick={this.addSticker} className="sticker"/></li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default SpottiStickersWindow
