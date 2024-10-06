import React from 'react'

class SpottiStickersWindow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stickers: ['spotti1.webp', 'spotti2.webp', 'spotti3.gif',
				'spotti4.gif', 'spotti5.gif', 'spotti6.png',
				'spotti7.gif', 'spotti8.gif', 'spotti9.gif',
				'spotti10.gif', 'spotti11.gif', 'spotti12.gif',
				'spotti13.gif', 'spotti14.gif', 'spotti15.gif',
				'spotti16.gif', 'spotti17.webp', 'spotti18.webp',
				'spotti19.webp', 'spotti20.webp', 'spotti21.webp',
				'spotti22.webp', 'spotti23.webp', 'spotti24.webp',
				'spotti25.webp', 'spotti26.webp', 'spotti27.webp',
				'spotti28.webp', 'spotti29.webp',
				'spotti30.webp', 'spotti31.webp', 'spotti32.webp',
				'spotti33.webp', 'spotti34.png', 'spotti35.webp',
				'spotti36.webp', 'spotti37.webp', 'spotti38.webp',
				'spotti39.webp'],
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
							<li className="sticker-item" key={index}><img src={"../../../../../../static/frontend/spotti-stickers/"+sticker}
												 onClick={this.addSticker} className="sticker"/></li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default SpottiStickersWindow
