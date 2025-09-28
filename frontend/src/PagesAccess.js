import React from "react"
import axios from "axios"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AdminPanel from "./components/admin-panel/AdminPanel"
import CiteSettings from "./components/admin-panel/cite-settings/base/CiteSettings"
import Moderators from "./components/admin-panel/moderators/base/Moderators"
import Guide from "./components/admin-panel/guide/base/Guide"
import UpdateList from "./components/admin-panel/updates-list/base/UpdateList"
import Workplan from "./components/admin-panel/workplan/base/Workplan"
import WalkPage from "./components/common-elements/message-pages/WalkPage"
import AgreementPage from "./components/common-elements/message-pages/AgreementPage"
import EmailConfirmPage from "./components/member/registration/email-confirm/EmailConfirmPage"
import Registration from "./components/member/registration/base/Registration"
import Login from "./components/member/login/base/Login"
import RoomsPage_wrap from "./store/wraps/base/RoomsPage_wrap"
import Polls_wrap from "./store/wraps/base/Polls_wrap"
import {MainPollsTemplate} from "./components/main-page/polls/MainPollsTemplate"
import Room from "./components/room-page/base/Room"
import BaseTemplate from "./components/common-elements/base/BaseTemplate"
import InfoPage_wrap from "./store/wraps/info-page/InfoPage_wrap"
import ProfilePage_wrap from "./store/wraps/member/ProfilePage_wrap"
import Settings from "./components/member/settings/base/Settings"
import Reports from "./components/admin-panel/reports/base/Reports"
import {BlackList} from "./components/admin-panel/reports/black-list/BlackList"
import Test from "./components/test/base/Test"

class PagesAccess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prevention_to: "",
            access_type: undefined,
            is_admin: undefined,
        }
        this.setTypes = this.setTypes.bind(this)
    }

    // access_type:
    // 0 - не авторизирован
    // 1 - участник не подтвержден
    // 2 - участник подтвержден
    // 3 - заблокирован

    componentDidMount() {
        //закостамизируем перед отображением
        axios.get('/api/get-colors').then(res => {
            const colors = res.data
            colors.map(color => {
                document.body.style.setProperty("--" + color.type, color.text)
            })
            this.props.set_colors(colors)
        })
        axios.get('/api/get-illustrations').then(res => {
            const illustrations = res.data
            this.props.set_illustrations(illustrations)
            illustrations.map(illustration => {
                document.body.style.setProperty("--" + illustration.type, "url("+illustration.text+")")
            })
        })
        const set_undefined_type = () => {
            this.setState({access_type: 0})
        }
        let auth_pr = axios.get('/api/get-user').catch(function (error) {
            console.log('Необходимо войти')
            set_undefined_type()
            return Promise.reject(error)
        })
        auth_pr.then((res) => {
            let member = res.data
            this.props.set_member(member)
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.member.id != this.props.member.id) {
            this.setTypes(nextProps.member)
        }
    }

    setTypes = (member) => {
        if (member.profile) {
            if (member.profile.is_blocked) {
                this.setState({access_type: 3})
            } else {
				if(!member.profile.email_confirm) {
					this.setState({access_type: 1})
				} else {
					this.setState({access_type: 2})
				}
                if (member.profile.is_admin == 1) {
                    this.setState({is_admin: 1})
                } else {
                    this.setState({is_admin: 0})
                }
            }
        }
    }

    render() {
        // если ведутся профилактические работы, то доступ к сайту имеют только модераторы, другие участники получают страницу с сообщением
        // в значении поля state.prevention_to необходимо указать время, до которого будут работы вестись
        if ((!this.state.prevention_to == '') && (this.state.access_type !== 3)) {
            return (
                <BrowserRouter>
                    <Routes>
                        <>
                            <Route path="*" element={<WalkPage code='4' prevention_to={this.state.prevention_to}/>}/>
                        </>
                    </Routes>
                </BrowserRouter>
            )
        }
        if (this.state.access_type == 3) {
            return (
                <BrowserRouter>
                    <Routes>
                        <>
                            <Route path="*" element={<WalkPage code='5' prevention_to={this.state.prevention_to}/>}/>
                        </>
                    </Routes>
                </BrowserRouter>
            )
        }
        return (
            <BrowserRouter>
                <Routes>
				{this.state.access_type}
                    {(() => {
                        if (this.state.access_type == 2) {
                            // авторизированным и подтвержденным
                            return (
                                <>
                                    <Route path="" element={<BaseTemplate/>}>
                                        <Route path="/poll/" element={<MainPollsTemplate/>}>
                                            <Route path="" element={<Polls_wrap/>}/>
                                            <Route path=":id" element={<Polls_wrap/>}/>
                                        </Route>
                                        <Route path="room/:id" element={<Room/>}/>
                                        <Route path="profile/:id" element={<ProfilePage_wrap/>}/>
                                        <Route path="settings" element={<Settings/>}/>
                                        <Route path="" element={<RoomsPage_wrap/>}/>
                                        <Route path="*" element={<RoomsPage_wrap/>}/>
                                    </Route>
                                    <Route path="tests" element={<Test/>}/>
                                    <Route path="email-confirm" element={<EmailConfirmPage />}/>
                                    <Route path="info-page" element={<InfoPage_wrap/>}/>
                                    <Route path="agreement" element={<AgreementPage/>}/>
                                    <Route path="/admin-panel" element={<AdminPanel/>}>
                                        <Route path="moderators" element={<Moderators/>}/>
                                        <Route path="guide/:section" element={<Guide/>}/>
                                        <Route path="updates" element={<UpdateList/>}/>
                                        <Route path="workplan" element={<Workplan/>}/>
                                    </Route>
                                </>
                            )
                        } else if (this.state.access_type == 1) {
							return( 
								<>
									<Route path="agreement" element={<AgreementPage/>}/>
                                    <Route path="login" element={<Login/>}/>
                                    <Route path="registration" element={<Registration/>}/>
									<Route path="*" element={<EmailConfirmPage/>}/>
								</>
							)
						} else if (this.state.access_type == 0) {
                            // для неавторизированных
                            return (
                                <>
                                    <Route path="login" element={<Login/>}/>
                                    <Route path="registration" element={<Registration/>}/>
                                    <Route path="agreement" element={<AgreementPage/>}/>
                                    <Route path="*" element={<Login />}/>
                                </>
                            )
                        } else {
                            return ('')
                        }
                    })()}
                    )}
                    {(() => {
                        // доступ к настройкам сайта
                        if (this.state.is_admin == 1) {
                            return (
                                <>
                                    <Route path="/admin-panel" element={<AdminPanel/>}>
                                        <Route path="cite-settings" element={<CiteSettings/>}/>
                                        <Route path="reports" element={<Reports/>}/>
                                        <Route path="black-list" element={<BlackList/>}/>
                                    </Route>
                                </>
                            )
                        } else if (this.state.is_admin == 0) {
                            if (this.state.access_type == 0) {
                                return (
                                    <>
                                        <Route path="cite-settings" element={<WalkPage code='1'/>}/>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <Route path="/admin-panel" element={<AdminPanel/>}>
                                            <Route path="cite-settings" element={<WalkPage code='3'/>}/>
                                            <Route path="reports" element={<WalkPage code='3'/>}/>
                                        </Route>
                                    </>
                                )
                            }
                        } else {
                            return ('')
                        }
                    })()}
                </Routes>
            </BrowserRouter>
        )
    }
}

export default PagesAccess
