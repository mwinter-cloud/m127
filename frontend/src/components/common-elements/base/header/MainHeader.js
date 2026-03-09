import React, {Component} from 'react'
import {Logo} from "./Logo"
import CiteSearch from "./CiteSearch"
import {ProfileBlock} from "./ProfileBlock"
import "../../style/cite-header.css"
import NotificationsSection_wrap from "../../../../store/wraps/room-page/NotificationsSection_wrap"
import ChatSection from "../../windows/chat/ChatSection"

export const MainHeader = ({main_section, member, changeMode}) => {
	return (
		<header className="main-header">
			<Logo />
			<CiteSearch/>
			<div className="flex-end">
				<ProfileBlock member={member} changeMode={changeMode} />
				<ChatSection />		
				<NotificationsSection_wrap />
			</div>
		</header>
	)
}

