import React, { Component } from 'react'
import {Logo} from "../Logo"
import CiteMenu from "../CiteMenu"
import {ProfileBlock} from "../ProfileBlock"
import NotificationsSection_wrap from "../../../../../store/wraps/room-page/NotificationsSection_wrap"
import MobileSiteSearch from "./MobileSiteSearch"

export const MobileMainHeader = ({main_section, member, changeMode}) => {
	return (
		<header className="main-header">
			<Logo/>
			<div className="flex-end">
				<ProfileBlock member={member} changeMode={changeMode}/>
				<NotificationsSection_wrap/>
				<MobileSiteSearch/>
			</div>
		</header>
	)
}