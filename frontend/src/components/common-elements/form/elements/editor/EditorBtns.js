import React from 'react'
import ColorsBlock_wrap from "../../../../../store/wraps/forms/ColorsBlock_wrap"
import MediaQuery from 'react-responsive'
import SmileBlock from "./SmileBlock"
import "../../../../../../static/frontend/stickers-btn.jpg"
import "../../../../../../static/frontend/smiles-btn.png"

class EditorBtns extends React.Component {
    constructor(props) {
        super(props)
        this.addSpoiler = this.addSpoiler.bind(this)
        this.addBlock1 = this.addBlock1.bind(this)
        this.addBlock2 = this.addBlock2.bind(this)
        this.addBlock3 = this.addBlock3.bind(this)
        this.addBlock4 = this.addBlock4.bind(this)
        this.addImage = this.addImage.bind(this)
        this.makeCursive = this.makeCursive.bind(this)
        this.makeBold = this.makeBold.bind(this)
        this.closeDesignWin = this.closeDesignWin.bind(this)
        this.openDesignWin = this.openDesignWin.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.onMouse = this.onMouse.bind(this)
        this.wrapperRef = React.createRef()
        this.state = {
            design_win_status: 'hide',
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside)
    }

    onMouse = (e) => {
        e.preventDefault()
    }


    makeCursive = (e) => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div');
        temp.textContent = '<i></i>';
        range.insertNode(temp.firstChild);
        selection.collapseToEnd()
    }

    makeBold = (e) => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div');
        temp.textContent = '<b></b>';
        range.insertNode(temp.firstChild);
        selection.collapseToEnd()
    }

    addSpoiler = () => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div class="spoiler"><header>заголовок</header><main>скрытый текст</main></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
    }

    addBlock1 = () => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="border-left: 3px solid rgb(66,178,247); padding: 5px; margin: 5px 0;"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
    }
    addBlock2 = () => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div class="content-block"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
    }
    addBlock3 = () => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="border-color: #6694a2; padding: 5px; margin: 5px 0;"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
    }
    addBlock4 = () => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = '<div style="background: #цвет;" class="color-block"></div>'
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
    }

    openDesignWin = (e) => {
        let win_type = e.target.getAttribute('data-type')
        if(win_type=="smiles"||win_type=="spotti") {
            this.props.setSmilesSection(e, win_type)
        }
        if (this.state.design_win_status == win_type) {
            this.setState({
                design_win_status: 'hide',
            })
        } else {
            this.setState({
                design_win_status: win_type,
            })
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            let win_type = event.target.getAttribute('data-type')
            if (event.target == document.querySelector('.block-btn')) {

                if (this.state.design_win_status == win_type) {
                    this.setState({
                        design_win_status: 'hide',
                    })
                } else {
                    this.setState({
                        design_win_status: win_type,
                    })
                }
            } else {
                this.setState({
                    design_win_status: 'hide',
                })
            }
        }
    }
	
	closeDesignWin = () => {
		this.setState({
            design_win_status: 'hide',
        })
	}

    selectColor = (color) => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div')
        temp.textContent = `<span class="${color}"></span>`
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
        this.setState({
            design_win_status: 'hide'
        })
    }

    addImage = () => {
        this.props.textareaRef.focus()
        let selection = window.getSelection(),
            range = selection.getRangeAt(0)
        let temp = document.createElement('div');
        temp.textContent = '<img src="?"/>';
        range.insertNode(temp.firstChild);
        selection.collapseToEnd()
    }

    render() {
        return (
            <>
                <div className={this.state.design_win_status == 'hide' ? 'hide' : 'redactor-design-win'}
                     ref={this.wrapperRef}>
                    {(() => {
                        if (this.state.design_win_status === 'colors') {
                            return (
								<>
									<header>Цветной текст <div className="el-icon-close close-btn" onClick={this.closeDesignWin}></div></header>
									<ColorsBlock_wrap selectColor={this.selectColor}/>
								</>
							)
                        } else if (this.state.design_win_status === 'blocks') {
                            return (
								<>
									<header>Контейнер <div className="el-icon-close close-btn" onClick={this.closeDesignWin}></div></header>
									<ul>
										<li onClick={this.addBlock1}>с полоской</li>
										<li onClick={this.addBlock2}>с фоном</li>
										<li onClick={this.addBlock3}>с границей</li>
										<li onClick={this.addBlock4}>цветной квадрат</li>
										<li onClick={this.addSpoiler}>спойлер</li>
									</ul>
								</>
                            )
                        } else if (this.state.design_win_status === 'smiles' || this.state.design_win_status === 'spotti') {
                            return (
								<>
									<header>=^-^= <div className="el-icon-close close-btn" onClick={this.closeDesignWin}></div></header>
									<SmileBlock textareaRef={this.props.textareaRef} smilesSection={this.state.design_win_status} />
								</>
                            )
                        }
                    })()}
                </div>
                <div className="input-header">
                    <ul className="editor-menu">
                        <li data-title="курсив" onClick={this.makeCursive} onMouseDown={this.onMouse}><i
                            className="el-icon-edit"></i></li>
                        <li className="bold-text-btn" data-title="жирный шрифт" onClick={this.makeBold} onMouseDown={this.onMouse}><i
                            className="">B</i></li>
                        <li data-title="цветной текст" className="color-text-btn">
							<span className="color-text-icon" data-type="colors" onClick={this.openDesignWin}>A</span>
							<div className="color-text-line"></div>
						</li>
                        <li data-title="блок" className="block-btn"><i className="el-icon-menu"
                                                                       onClick={this.openDesignWin}
                                                                       data-type="blocks"></i>
                        </li>
                        <li data-title="изображение" onClick={this.addImage} onMouseDown={this.onMouse}><i
                            className="el-icon-picture-outline"></i></li>
                        <MediaQuery minWidth={801}>
                            <li data-title="стикеры" className="block-btn"><img
                                src={this.props.smilesSection == "spotti" ?
                                    ("../../../../../../static/frontend/smiles-btn.png") :
                                    ("../../../../../../static/frontend/stickers-btn.jpg")}
                                onClick={this.props.setSmilesSection}/></li>
                        </MediaQuery>
                        <MediaQuery maxWidth={800}>
                            <li data-title="смайлы" onMouseDown={this.onMouse}>
                                <img
                                    src="../../../../../../static/frontend/smiles-btn.png"
                                    onClick={this.openDesignWin} data-type="smiles"/>
                            </li>
                            <li data-title="стикеры" className="block-btn">
                                <img src="../../../../../../static/frontend/stickers-btn.jpg"
                                     onClick={this.openDesignWin} data-type="spotti"/></li>
                        </MediaQuery>
                    </ul>
                </div>
            </>
        )
    }
}

export default EditorBtns
