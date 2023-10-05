import React, { Component } from 'react'
import axios from "axios"

class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 0,
            selected_star: 0,
            voice_sended: 0
        }
		this.starHover = this.starHover.bind(this)
		this.starOnLeave = this.starOnLeave.bind(this)
		this.setRating = this.setRating.bind(this)
		this.starSelect = this.starSelect.bind(this)
		this.initStars = this.initStars.bind(this)
    }

    componentDidMount() {
        this.setRating()
        document.querySelector('.star-list').style.width = this.state.rating * 20 + '%'
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.room_id!=nextProps.room_id) {
            this.setRating(nextProps.room_id)
            document.querySelector('.star-list').style.width = this.state.rating * 20 + '%'
        }
    }

    setRating = (rating) => {
        const init = (data) => {this.initStars(data,(rating?1:0))}
        axios.get('http://' + window.location.host + '/api/get-room-voices/'+(rating?rating:this.props.room_id)).then(res => {
            init(res.data)
        })
    }

    initStars = (data,load_page) => {
        if (data.is_my_voice) {
            this.setState({voice_sended: 1})
            let rating = 0
            data.voice_list.map(el => {
                rating += el.grade
            })
            rating = (rating / data.voice_list.length).toFixed(1)
            this.setState({rating: rating}, () => {
                document.querySelector('.star-list').style.width = this.state.rating * 20 + '%'
            })
        }
        if(load_page&&!data.is_my_voice) {
            this.setState({voice_sended: 0})
            this.setState({rating: 0}, () => {
                document.querySelector('.star-list').style.width = 0
            })
        }
    }

    starHover = (e) => {
        if(!this.state.voice_sended) {
            let star_num = e.target.getAttribute('data-num')
            document.querySelector('.star-list').style.width = star_num * 20 + '%'
        }
    }

    starOnLeave = () => {
        document.querySelector('.star-list').style.width = this.state.rating*20+'%'
    }

    starSelect = (e) => {
        let star_num = e.target.getAttribute('data-num')
        this.setState({selected_star: star_num})
        let data = {room: this.props.room_id, grade: star_num}
        const init = (data) => {
            this.initStars(data)
            this.setState({voice_sended: 1})
        }
        if(!this.state.voice_sended) {
            $.ajax({
                type: 'post',
                url: '/api/send-room-voice',
                cache: false,
                data: data,
                success: function (res) {
                    init(res)
                },
                error: function (xhr) {
                    console.log(JSON.parse(xhr.responseText))
                    console.log("Не вышло отправить голос.")
                }
            })
        }
    }

    render() {
        return (
            <div className="rating-aside-field">
                <span className="rating-arrow"><i className="el-icon-d-arrow-left"></i></span>
                <div className="rating-block">
                    <div className="null-rating-block">
                        <i className="el-icon-star-on" data-num="1" onClick={this.starSelect}
                           onMouseEnter={this.starHover} onMouseLeave={this.starOnLeave}></i>
                        <i className="el-icon-star-on" data-num="2" onClick={this.starSelect}
                           onMouseEnter={this.starHover} onMouseLeave={this.starOnLeave}></i>
                        <i className="el-icon-star-on" data-num="3" onClick={this.starSelect}
                            onMouseLeave={this.starOnLeave} onMouseEnter={this.starHover}></i>
                        <i className="el-icon-star-on" data-num="4" onClick={this.starSelect}
                            onMouseLeave={this.starOnLeave} onMouseEnter={this.starHover}></i>
                        <i className="el-icon-star-on" data-num="5" onClick={this.starSelect}
                            onMouseLeave={this.starOnLeave} onMouseEnter={this.starHover}></i>
                    </div>
                    <div className="star-list">
                        <div className="show-rating">
                            <i className="el-icon-star-on"></i>
                            <i className="el-icon-star-on"></i>
                            <i className="el-icon-star-on"></i>
                            <i className="el-icon-star-on"></i>
                            <i className="el-icon-star-on"></i>
                        </div>
                    </div>
                </div>
                {this.state.rating!=0?(<span className="rating-grade">{this.state.rating}</span>):null}
            </div>
        )
    }
}

export default Rating
