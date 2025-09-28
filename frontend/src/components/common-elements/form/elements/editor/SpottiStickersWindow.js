import React from 'react'

export const SpottiStickersWindow = ({textareaRef}) => {
	const stickers = ['spotti1.webp', 'spotti2.webp', 'spotti3.gif',
		'spotti4.webp', 'spotti5.gif', 'spotti6.gif',
		'spotti7.gif', 'spotti8.gif', 'spotti9.gif',
		'spotti10.gif', 'spotti11.webp', 'spotti12.gif',
		'spotti13.gif', 'spotti14.gif', 'spotti15.gif',
		'spotti16.gif', 'spotti17.webp', 'spotti18.webp',
		'spotti19.webp', 'spotti20.webp', 'spotti21.webp',
		'spotti22.gif', 'spotti23.webp', 'spotti24.webp',
		'spotti25.webp', 'spotti26.jpg', 'spotti27.webp',
		'spotti28.jpg', 'spotti29.jpg',
		'spotti30.webp', 'spotti31.webp', 'spotti32.webp',
		'spotti33.gif', 'spotti34.jpg', 'spotti35.webp',
		'spotti36.jpg', 'spotti37.webp', 'spotti38.jpg',
		'spotti39.webp', 'spotti40.webp', 'spotti41.webp',
		'spotti42.jpg', 'spotti43.jfif', 'spotti44.gif', 
		'spotti45.jpg']

	const addSticker = (e) => {
		//добавим элемент в div contenteditable
		let img = e.target.cloneNode(true)
		textareaRef.focus()
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
		textareaRef.dispatchEvent(event)
	}

	return (
		<div className="stickers-block">
			<ul>
				{stickers.map((sticker, index) => {
					return (
						<li className="sticker-item" key={index}><img src={"../../../../../../static/frontend/spotti-stickers/"+sticker}
											 onClick={addSticker} className="sticker"/></li>
					)
				})}
			</ul>
		</div>
	)
}
