// libs
import Link from "next/link";
import {observer} from "mobx-react";
import {signOut, useSession} from "next-auth/react"
import {useRouter} from "next/router";
import {Button} from "react-bootstrap";

// custom
import {MENU_ITEMS, MENU_ITEM_VALIDATOR , TOKEN_LINK} from "../constants/constants";
import {capitalize} from "../utilities/utilities";
import appStore from "../stores/AppStore";
import ButtonPrime from "../components/button-main/Button";


const Layout = ({children}) => {
	const router = useRouter()
	appStore.selectMenu(router.pathname.split("/")[1]);

	// fix page high for pages higher than screen size
	const longPages = [
		'/',
		'/candidates/[candidateId]'
	]

	const styleHeight = longPages.includes(router.pathname) ? {height: 'auto'} : {height: '100%'}

	const {data: session} = useSession()
	const menuItems = appStore.user.category === 1 ? MENU_ITEM_VALIDATOR : MENU_ITEMS;

	return (
		<div className="page-layout" style={styleHeight}>
			<div className="menus">
				<div className="logo"/>

				{Object.keys(menuItems).map(item => {
					const value = menuItems[item];
					return (
						<Link href={`/${value === menuItems.DASHBOARD ? '' : value}`} key={item}>
							<a className={`menu-item ${appStore.selectedMenu === value ? 'active' : ''}`}
							   onClick={() => appStore.selectMenu(value)}>
								<div className={`menu-item_logo ${value}-logo`}/>
								<span>{capitalize(value)}</span>
							</a>
						</Link>
					)
				})}
			</div>

			<div className="page">
				<div className="top-bar">
					<div className="left-side">
						<div className="menu-icon"/>
						<p className="page-title">{capitalize(appStore.selectedMenu)}</p>
						{appStore.selectedMenu === MENU_ITEMS.JOBS && <ButtonPrime path="/jobs/create">Add new</ButtonPrime>}
					</div>

					<div className="right-side">
						<input className="search-bar" type="text" placeholder="Search for something here..."/>
						<Button variant="secondary" className="search-logo"/>
						<div className="notifications">
							<a href={TOKEN_LINK} target="_blank" rel="noreferrer" className="small-logo"> </a>
							<span className="amount">500</span>
						</div>

						<div className="user-info">
							<div className="user-picture" onClick={() => signOut()}>
								<img src="https://static.wikia.nocookie.net/despicableme/images/c/ca/Bob-from-the-minions-movie.jpg"
								     alt=""/>
							</div>

							<div className="details">
								<p>{session.user.token && `${session.user.first_name} ${session.user.last_name[0]}.`}</p>
								<p>HR Manager</p>
							</div>
						</div>

					</div>
				</div>

				<div className="page-content">
					{children}
				</div>
			</div>
		</div>
	)
}

export default observer(Layout);

