import React, { Component } from 'react'
import {Logo} from "./Logo"
import CiteMenu from "./CiteMenu"
import CiteSearch from "./CiteSearch"
import {ProfileBlock} from "./ProfileBlock"
import '../../style/cite-header.css'
import NotificationsSection_wrap from "../../../../store/wraps/room-page/NotificationsSection_wrap"

export const MainHeader = ({main_section, member, changeMode}) => {
	return (
		<header className="main-header">
			<Logo />
			<CiteMenu active_section={main_section} />
			<CiteSearch/>
			<div className="flex-end">
				<ProfileBlock member={member} changeMode={changeMode} />
				<NotificationsSection_wrap />
			</div>
		</header>
	)
}

