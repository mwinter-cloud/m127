import React, {Component} from 'react'
import SectionContent from "./article/SectionContent"
import {SectionHeader} from "../elements/SectionHeader"
import {Header} from "../elements/Header"
import axios from "axios"
import replace_array_item from "../../../../special-functions/replace-array-item"
import replace_array_item_field from "../../../../special-functions/replace-array-item-field"

class SectionMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            section_name: '',
            articles: 'undefined',
            search_msg: '',
			loading_status: ''
        }
        this.initSection = this.initSection.bind(this)
        this.setArticle = this.setArticle.bind(this)
        this.setIllustrations = this.setIllustrations.bind(this)
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        this.initSection(this.props.section)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.section != nextProps.section) {
            this.initSection(nextProps.section)
        }
    }

    initSection = (section_id) => {
        switch (section_id) {
            case "1":
                this.setState({section_name: "Концепция сайта"})
                break
            case "2":
                this.setState({section_name: "Руководство по использованию"})
                break
            case "3":
                this.setState({section_name: "Описание кода backend"})
                break
            case "4":
                this.setState({section_name: "Описание кода frontend"})
                break
            case "5":
                this.setState({section_name: "Учебные материалы по организации сообщества"})
                break
            case "6":
                this.setState({section_name: "Учебные материалы для программистов"})
                break
            default:
                break
        }
        axios.get(window.location.origin + '/api/get-guide-articles/' + section_id, {
				onDownloadProgress: () => {
					this.setState({loading_status: 'loading'})
				}
			}).then(res => {
            this.setState({articles: res.data})
			this.setState({loading_status: 'loaded'})
        }).catch(() => {
			this.setState({loading_status: 'error'})
		})
    }


    setArticle = (data) => {
        let new_articles = replace_array_item(this.state.articles, data)
        this.setState({articles: new_articles})
    }

    setIllustrations = (article_id, new_illustrations) => {
        let new_articles = replace_array_item_field(this.state.articles, article_id, "illustrations", new_illustrations)
        this.setState({articles: new_articles})
    }

    search = (form) => {
        if(form.get('search_str') != '') {
			axios.post(`${window.location.origin}/api/guide-search`, formData, {
				onDownloadProgress: () => {
					this.setState({loading_status: 'loading'})
				}
			}).then(({data}) => {
				if (data) {
                    this.setState({section_name: 'Поиск'})
                    this.setState({articles: data})
					this.setState({loading_status: 'loaded'})
                } else {
					this.setState({loading_status: 'loaded'})
                    this.setState({search_msg: 'Ничего не найдено'})
                }
			}).catch(() => {
				this.setState({loading_status: 'error'})
			})
        }
    }

    render() {
		return (
			<main className="guide-main">
				{(() => {
					if (this.state.loading_status == 'loaded') {
						return (
							<>
								<Header search={this.search}/>
								{this.state.articles != 'undefined' && (
									<>
										<SectionHeader articles={this.state.articles} section_name={this.state.section_name} />
										{this.state.search_msg ? (<p>{this.state.search_msg}</p>) : null}
										<SectionContent articles={this.state.articles} setArticle={this.setArticle} setIllustrations={this.setIllustrations} />
									</>
								)}
							</>
						)
					} else if (this.state.loading_status == 'error') {
						return <p className="error-msg">Ошибка.</p>
					} else {
						return <div className="loading-icon"><i className="el-icon-loading"></i></div>
					}
				})()}
			</main>
		)
    }
}

export default SectionMain
