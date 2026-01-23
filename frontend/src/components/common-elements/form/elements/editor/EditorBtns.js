import React from 'react'
import ColorsBlock_wrap from "../../../../../store/wraps/forms/ColorsBlock_wrap"
import MediaQuery from 'react-responsive'
import SmileBlock from "./SmileBlock"
import "../../../../../../static/frontend/stickers-btn.jpg"
import "../../../../../../static/frontend/smiles-btn.png"
import axios from "axios"

class EditorBtns extends React.Component {
    constructor(props) {
        super(props)
        this.addSpoiler = this.addSpoiler.bind(this)
        this.addBlock1 = this.addBlock1.bind(this)
        this.addBlock2 = this.addBlock2.bind(this)
        this.addBlock3 = this.addBlock3.bind(this)
        this.openImageWin = this.openImageWin.bind(this)
        this.insertImageByUrl = this.insertImageByUrl.bind(this)
        this.onImageUrlChange = this.onImageUrlChange.bind(this)
        this.onImageFileChange = this.onImageFileChange.bind(this)
        this.uploadAndInsertImage = this.uploadAndInsertImage.bind(this)
        this.openAudioWin = this.openAudioWin.bind(this)
        this.insertAudioByUrl = this.insertAudioByUrl.bind(this)
        this.onAudioUrlChange = this.onAudioUrlChange.bind(this)
        this.onAudioFileChange = this.onAudioFileChange.bind(this)
        this.uploadAndInsertAudio = this.uploadAndInsertAudio.bind(this)
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
            image_mode: 'url', // 'url' | 'file'
            image_url: '',
            image_file: null,
            image_error: null,
            image_loading: 'loaded', // 'loaded' | 'loading'
            audio_mode: 'url', // 'url' | 'file'
            audio_url: '',
            audio_file: null,
            audio_error: null,
            audio_loading: 'loaded', // 'loaded' | 'loading'
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

    openImageWin = () => {
        if (this.state.design_win_status === 'image') {
            this.setState({design_win_status: 'hide'})
        } else {
            this.setState({
                design_win_status: 'image',
                image_error: null,
                image_loading: 'loaded',
            })
        }
    }

    onImageUrlChange = (e) => {
        this.setState({image_url: e.target.value, image_error: null})
    }

    onImageFileChange = (e) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null
        this.setState({image_file: file, image_error: null})
    }

    insertImageByUrl = () => {
        const url = (this.state.image_url || '').trim()
        if (!url) {
            this.setState({image_error: 'Введите URL изображения.'})
            return
        }
        // very light validation; server-side validation is for file uploads
        if (!/^https?:\/\//i.test(url) && !/^\/media\//i.test(url)) {
            this.setState({image_error: 'URL должен начинаться с http(s):// или /media/.'})
            return
        }

        this.props.textareaRef.focus()
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const temp = document.createElement('div')
        temp.textContent = `<img src="${url}"/>`
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
        this.closeDesignWin()
        this.setState({image_url: '', image_file: null})
    }

    uploadAndInsertImage = async () => {
        if (this.state.image_loading === 'loading') return
        const file = this.state.image_file
        if (!file) {
            this.setState({image_error: 'Выберите файл изображения.'})
            return
        }
        this.setState({image_loading: 'loading', image_error: null})
        try {
            const formData = new FormData()
            formData.append('csrfmiddlewaretoken', csrftoken)
            formData.append('image', file)
            const {data} = await axios.post(
                `${window.location.origin}/api/upload-answer-image`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
            const url = data && data.url ? data.url : null
            if (!url) {
                this.setState({image_error: 'Сервер не вернул ссылку на изображение.'})
                return
            }
            this.setState({image_url: url}, this.insertImageByUrl)
        } catch (e) {
            this.setState({image_error: 'Загрузить изображение не удалось. Попробуйте позже.'})
        } finally {
            this.setState({image_loading: 'loaded'})
        }
    }

    openAudioWin = () => {
        if (this.state.design_win_status === 'audio') {
            this.setState({design_win_status: 'hide'})
        } else {
            this.setState({
                design_win_status: 'audio',
                audio_error: null,
                audio_loading: 'loaded',
            })
        }
    }

    onAudioUrlChange = (e) => {
        this.setState({audio_url: e.target.value, audio_error: null})
    }

    onAudioFileChange = (e) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null
        this.setState({audio_file: file, audio_error: null})
    }

    insertAudioByUrl = () => {
        const url = (this.state.audio_url || '').trim()
        if (!url) {
            this.setState({audio_error: 'Введите URL аудиофайла.'})
            return
        }
        // very light validation; server-side validation is for file uploads
        if (!/^https?:\/\//i.test(url) && !/^\/media\//i.test(url)) {
            this.setState({audio_error: 'URL должен начинаться с http(s):// или /media/.'})
            return
        }

        this.props.textareaRef.focus()
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const temp = document.createElement('div')
        temp.textContent = `<audio src="${url}" controls></audio>`
        range.insertNode(temp.firstChild)
        selection.collapseToEnd()
        this.props.inputTrigger()
        this.closeDesignWin()
        this.setState({audio_url: '', audio_file: null})
    }

    uploadAndInsertAudio = async () => {
        if (this.state.audio_loading === 'loading') return
        const file = this.state.audio_file
        if (!file) {
            this.setState({audio_error: 'Выберите аудиофайл.'})
            return
        }
        this.setState({audio_loading: 'loading', audio_error: null})
        try {
            const formData = new FormData()
            formData.append('csrfmiddlewaretoken', csrftoken)
            formData.append('audio', file)
            const {data} = await axios.post(
                `${window.location.origin}/api/upload-answer-audio`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
            const url = data && data.url ? data.url : null
            if (!url) {
                this.setState({audio_error: 'Сервер не вернул ссылку на аудиофайл.'})
                return
            }
            this.setState({audio_url: url}, this.insertAudioByUrl)
        } catch (e) {
            this.setState({audio_error: 'Загрузить аудиофайл не удалось. Попробуйте позже.'})
        } finally {
            this.setState({audio_loading: 'loaded'})
        }
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
                        } else if (this.state.design_win_status === 'image') {
                            return (
                                <>
                                    <header>Изображение <div className="el-icon-close close-btn" onClick={this.closeDesignWin}></div></header>
                                    <div className="image-insert-win">
                                        <div className="image-insert-tabs">
                                            <button
                                                type="button"
                                                className={this.state.image_mode === 'url' ? 'active' : ''}
                                                onClick={() => this.setState({image_mode: 'url', image_error: null})}
                                            >
                                                URL
                                            </button>
                                            <button
                                                type="button"
                                                className={this.state.image_mode === 'file' ? 'active' : ''}
                                                onClick={() => this.setState({image_mode: 'file', image_error: null})}
                                            >
                                                Файл
                                            </button>
                                        </div>

                                        {this.state.image_mode === 'url' ? (
                                            <div className="image-insert-body">
                                                <input
                                                    type="text"
                                                    placeholder="https://example.com/image.jpg или /media/..."
                                                    value={this.state.image_url}
                                                    onChange={this.onImageUrlChange}
                                                />
                                                <button type="button" onClick={this.insertImageByUrl}>Вставить</button>
                                            </div>
                                        ) : (
                                            <div className="image-insert-body">
                                                <input type="file" accept="image/*" onChange={this.onImageFileChange} />
                                                <button
                                                    type="button"
                                                    onClick={this.uploadAndInsertImage}
                                                    disabled={this.state.image_loading === 'loading'}
                                                >
                                                    {this.state.image_loading === 'loading' ? 'Загрузка…' : 'Загрузить и вставить'}
                                                </button>
                                            </div>
                                        )}

                                        {this.state.image_error ? (
                                            <div className="image-insert-error">{this.state.image_error}</div>
                                        ) : null}
                                    </div>
                                </>
                            )
                        } else if (this.state.design_win_status === 'audio') {
                            return (
                                <>
                                    <header>Аудио <div className="el-icon-close close-btn" onClick={this.closeDesignWin}></div></header>
                                    <div className="image-insert-win">
                                        <div className="image-insert-tabs">
                                            <button
                                                type="button"
                                                className={this.state.audio_mode === 'url' ? 'active' : ''}
                                                onClick={() => this.setState({audio_mode: 'url', audio_error: null})}
                                            >
                                                URL
                                            </button>
                                            <button
                                                type="button"
                                                className={this.state.audio_mode === 'file' ? 'active' : ''}
                                                onClick={() => this.setState({audio_mode: 'file', audio_error: null})}
                                            >
                                                Файл
                                            </button>
                                        </div>

                                        {this.state.audio_mode === 'url' ? (
                                            <div className="image-insert-body">
                                                <input
                                                    type="text"
                                                    placeholder="https://example.com/audio.mp3 или /media/..."
                                                    value={this.state.audio_url}
                                                    onChange={this.onAudioUrlChange}
                                                />
                                                <button type="button" onClick={this.insertAudioByUrl}>Вставить</button>
                                            </div>
                                        ) : (
                                            <div className="image-insert-body">
                                                <input type="file" accept="audio/*" onChange={this.onAudioFileChange} />
                                                <button
                                                    type="button"
                                                    onClick={this.uploadAndInsertAudio}
                                                    disabled={this.state.audio_loading === 'loading'}
                                                >
                                                    {this.state.audio_loading === 'loading' ? 'Загрузка…' : 'Загрузить и вставить'}
                                                </button>
                                            </div>
                                        )}

                                        {this.state.audio_error ? (
                                            <div className="image-insert-error">{this.state.audio_error}</div>
                                        ) : null}
                                    </div>
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
                        <li data-title="изображение" onClick={this.openImageWin} onMouseDown={this.onMouse}><i
                            className="el-icon-picture-outline"></i></li>
                        <li data-title="аудио" onClick={this.openAudioWin} onMouseDown={this.onMouse}><i className="el-icon-microphone"></i></li>
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
