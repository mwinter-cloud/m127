import React from 'react'
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

class TextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.setShowedStatus = this.setShowedStatus.bind(this)
        this.updateEditor = this.updateEditor.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.paste = this.paste.bind(this)
        this.inputTrigger = this.inputTrigger.bind(this)
        this.setSmilesSection = this.setSmilesSection.bind(this)
        this.state = {
            design_win_status: 'hide',
            showed_status: 0,
            smiles_section: "smiles",
        }
    }

    setShowedStatus = () => {
        if (this.state.showed_status == 1) {
            this.setState({
                showed_status: 0,
            })
        } else {
            this.setState({
                showed_status: 1,
            })
        }
    }

    updateEditor = () => {
        let div_editable = document.getElementById(this.props.form_name + "_div_editable")
        let redactor_html = div_editable.innerHTML
        this.props.setText(redactor_html)
    }

    inputTrigger = () => {
        let div_editable = document.getElementById(this.props.form_name + "_div_editable")
        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        })
        div_editable.dispatchEvent(event)
    }

    paste = (event) => {
        event.preventDefault()
        let div_textarea = document.getElementById(this.props.form_name + "_div_editable")
        div_textarea.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = event.clipboardData.getData('text/plain')
        range.deleteContents()
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.inputTrigger()
    }

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            let div_editable = document.getElementById(this.props.form_name + "_div_editable")
            div_editable.focus()
            let selection = window.getSelection(),
                range = selection.getRangeAt(0),
                temp = document.createElement('br'),
                insertion = document.createDocumentFragment()
            range.deleteContents()
            range.insertNode(insertion)
            selection.collapseToEnd()
            this.inputTrigger()
            return false
        }
        if (e.keyCode === 8) {
            this.inputTrigger()
        }
    }

    setSmilesSection = (e, section="") => {
        if(section) {
            this.setState({smiles_section: section})
        } else {
            let smiles_section = this.state.smiles_section == "smiles" ? "spotti" : "smiles"
            this.setState({smiles_section: smiles_section})
        }
    }

    render() {
        return (
            <>
                {this.state.showed_status ? (<ShowedAnswer text={this.props.text_value}/>) : null}
                <div className={this.state.showed_status ? 'hide' : 'editor-container'}>
                    <EditorBtns div_editable_name={this.props.form_name + "_div_editable"}
                                smiles_section={this.state.smiles_section}
                                inputTrigger={this.inputTrigger} setSmilesSection={this.setSmilesSection}/>
                    <div className="textarea-block">
                        <div contentEditable onPaste={this.paste} id={this.props.form_name + "_div_editable"}
                             className="editor-textarea" onInput={this.updateEditor}></div>
                        <MediaQuery minWidth={801}>
                            <SmileBlock div_editable_name={this.props.form_name + "_div_editable"}
                                        smiles_section={this.state.smiles_section}/>
                        </MediaQuery>
                    </div>
                </div>
                <div className={this.state.showed_status == 1 ? "i-btn el-icon-edit" : "i-btn el-icon-view"}
                   onClick={this.setShowedStatus}></div>
            </>
        )
    }
}
export default TextEditor
