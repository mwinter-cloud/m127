import React, { Component } from 'react'
import Illustration from "./Illustration"
import FormWindow from "../../../../common-elements/windows/FormWindow"
import GuideArticleForm from "../../forms/GuideArticleForm"
import GuideImageForm from "../../forms/GuideImageForm"
import parse from "html-react-parser"

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit_window: 0,
            image_window: 0,
        }
        this.openEditWindow = this.openEditWindow.bind(this)
        this.openImageWindow = this.openImageWindow.bind(this)
        this.formConfirm = this.formConfirm.bind(this)
        this.removeImage = this.removeImage.bind(this)
    }

    openEditWindow = () => {
        this.setState({edit_window: (this.state.edit_window ? 0 : 1)})
    }

    openImageWindow = () => {
        this.setState({image_window: (this.state.image_window ? 0 : 1)})
    }

    formConfirm = (data) => {
        const update_article = (data) => {
            this.openEditWindow()
            this.props.setArticle(data)
        }
        $.ajax({
            type: 'post',
            url: '/api/edit-article',
            data: data,
            success: function (res) {
                update_article(res)
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    removeImage = (removed_id) => {
        let new_illustrations = this.props.article.illustrations.filter(function (id) {
            return Number(id) !== Number(removed_id)
        })
        this.props.setIllustrations(this.props.article.id, new_illustrations)
    }

    addIllustration = (data) => {
        let new_article_illustrations = this.props.article.illustrations
        new_article_illustrations = new_article_illustrations.concat(data.id)
        this.props.setIllustrations(this.props.article.id, new_article_illustrations)
        this.openImageWindow()
    }

    render() {
        return (
            <>
                {this.state.image_window ? (
                    <FormWindow children={<GuideImageForm article_id={this.props.article.id}
                                                          addIllustration={this.addIllustration}/>}
                                title="Добавить иллюстрацию"
                                closeWindow={this.openImageWindow} formConfirm={this.formConfirm}/>) : ""}
                {this.state.edit_window ? (
                    <FormWindow
                        children={<GuideArticleForm article={this.props.article} formConfirm={this.formConfirm}/>}
                        title="Редактирование руководства"
                        closeWindow={this.openEditWindow}/>) : ""}
                <div className="guide-card" id={"card" + this.props.article.id}>
                    <h4>{this.props.article.name}</h4>
                    <div className="content">
                        <div className="text">
                            <p>{parse(this.props.article.text)}</p>
                        </div>
                        <div className="illustrations">
                            {this.props.article.illustrations.map((illustration, index) => {
                                return (
                                    <Illustration illustration_id={illustration}
                                                  article_title={this.props.article.name}
                                                  removeImage={this.removeImage}
                                                  key={index}/>)
                            })}
                            {this.props.is_admin?(
                                <div className="text-btn" onClick={this.openImageWindow}><i
                                className="el-icon-plus"></i> изображение
                            </div>
                            ):null}
                        </div>
                    </div>
                    {this.props.is_admin?(
                    <div className="big-simple-btn" onClick={this.openEditWindow}><i
                        className="el-icon-edit"></i> Редактировать
                    </div>):null}
                </div>
            </>
        )
    }
}

export default Article
