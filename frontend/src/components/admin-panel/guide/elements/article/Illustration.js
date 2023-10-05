import React, { Component } from 'react'
import FullScreenWindow from "../../../../common-elements/windows/FullScreenWindow"
import ImagePage from "./ImagePage"
import axios from "axios"

class Illustration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            illustration: "undefined",
        }
        this.openImage = this.openImage.bind(this)
        this.removeImage = this.removeImage.bind(this)
    }

    componentDidMount() {
        axios.get('http://' + window.location.host + '/api/get-article-image/' + this.props.illustration_id).then(res => {
            const data = res.data
            this.setState({illustration: data})
        })
    }

    openImage = () => {
        this.setState({image_window: (this.state.image_window ? 0 : 1)})
    }

    removeImage = (id) => {
        this.openImage()
        this.props.removeImage(id)
    }

    render() {
        if(this.state.illustration!="undefined") {
            return (
                <>
                    {this.state.image_window ? (
                        <FullScreenWindow
                            children={<ImagePage image={this.state.illustration}
                                                 article_title={this.props.article_title}
                                                 removeImage={this.removeImage}
                                                 closeWindow={this.openImage}/>}/>) : ""}
                    <div className="illustration" onClick={this.openImage}>
                        <img src={this.state.illustration.file}/>
                        <p>{this.state.illustration.description}</p>
                    </div>
                </>
            )
        } else {
            return null
        }
    }
}

export default Illustration
