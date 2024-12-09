import React, {useState, useEffect, useRef} from 'react'
import '../../style/editor.css'
import SmileBlock from "./SmileBlock"
import EditorBtns from "./EditorBtns"
import MediaQuery from 'react-responsive'
import ShowedAnswer from "../../../../room-page/elements/ShowedAnswer"

export function specialtagstohtml(text) {
    if(text) {
        let html = text.replace(new RegExp('&lt;appeal to=([0-9]+) color=([a-z-]*) answer=([0-9]+)&gt;([^`]+?)&lt;/appeal&gt;','g'),'<span class="answer-link $2" data-id="$3">$4</span>')
        html = html.replace(new RegExp('&lt;img src="/media/smiles/([^`]+?).png" class="smile"', 'g'), '<img src="/media/smiles/$1.png" class="smile">')
        html = html.replace(new RegExp('&lt;img src="([^`]+?)"/&gt;', 'g'), '<img src="$1" class="answer-illustration">')
        html = html.replace(new RegExp('&lt;div&gt;&lt;/div&gt;', 'g'), '')
        html = html.replace(new RegExp('&lt;p&gt;&lt;/p&gt;', 'g'), '')
        html = html.replace(new RegExp('&lt;b&gt;&lt;/b&gt;', 'g'), '')
        html = html.replace(new RegExp('&lt;i&gt;&lt;/i&gt;', 'g'), '')
        html = html.replace(new RegExp('&lt;div class="spoiler"&gt;&lt;header&gt;([^`]+?)&lt;/header&gt;&lt;main&gt;([^`]+?)&lt;/main&gt;&lt;/div&gt;', 'g'), '<div class="spoiler"><header>$1</header><main>$2</main></div>')
        html = html.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
        return html
    }
}

export function transformationforshow(text) {
    if(text) {
        let html = text.replace(new RegExp('<div class="spoiler">([^`]*?)<header>([^`]+?)</header>([^`]*?)<main>([^`]+?)</main>([^`]*?)</div>', 'g'), '<div class="spoiler"><header>$2<button></button></header><main>$4</main></div>')
        return html
    }
}

export function specialtagsinnotification(text){
    let html = text.replace(new RegExp('&lt;appeal to=([0-9]+) color=([a-z-]+)&gt;([^`]+?), &lt;/appeal&gt;','g'),'')
    return html
}

export const TextEditor = ({textValue, setText, initialText=null}) => {
	const textareaRef = useRef(null)
	const [designWinStatus, setDesignWinStatus] = useState('hide')
	const [editorVisibilityStatus, setEditorVisibilityStatus] = useState('editor-container')
	const [smilesSection, setSmilesSection] = useState('smiles')

	useEffect(() => {
		if(initialText == 'loaded') {
			textareaRef.current.innerHTML = textValue
		}
	}, [initialText])
	
	useEffect(() => {
		if(textValue == '') {
			// если обнулили значение после отправки
			textareaRef.current.innerHTML = ''
		}
	}, [textValue])

    const upShowedStatus = () => {
		setEditorVisibilityStatus(editorVisibilityStatus == 'editor-container' ? 'editor-hide' : 'editor-container')
    }

    const updateEditor = () => {
        let redactor_html = textareaRef.current.innerHTML
        setText(redactor_html)
    }

    const inputTrigger = () => {
        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        })
        textareaRef.current.dispatchEvent(event)
    }

    const paste = (event) => {
        event.preventDefault()
        textareaRef.current.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = event.clipboardData.getData('text/plain')
        range.deleteContents()
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        inputTrigger()
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            textareaRef.current.focus()
            let selection = window.getSelection(),
                range = selection.getRangeAt(0),
                temp = document.createElement('br'),
                insertion = document.createDocumentFragment()
            range.deleteContents()
            range.insertNode(insertion)
            selection.collapseToEnd()
            inputTrigger()
            return false
        }
        if (e.keyCode === 8) {
            inputTrigger()
        }
    }

    const upSmilesSection = (e, section = "") => {
        if(section) {
            setSmilesSection(section)
        } else {
            setSmilesSection(smilesSection == "smiles" ? "spotti" : "smiles")
        }
    }

	return (
		<>
			{editorVisibilityStatus == 'editor-hide' && <ShowedAnswer text={textValue}/>}
			<div className={editorVisibilityStatus}>
				<EditorBtns textareaRef={textareaRef.current}
							smilesSection={smilesSection}
							inputTrigger={inputTrigger} setSmilesSection={upSmilesSection}/>
				<div className="textarea-block">
					<div contentEditable onPaste={paste} ref={textareaRef}
						 className="editor-textarea" onInput={updateEditor}></div>
					<MediaQuery minWidth={801}>
						<SmileBlock textareaRef={textareaRef.current} smilesSection={smilesSection} />
					</MediaQuery>
				</div>
			</div>
			<div className={"i-btn el-icon-" + editorVisibilityStatus} onClick={upShowedStatus}></div>
		</>
	)
}