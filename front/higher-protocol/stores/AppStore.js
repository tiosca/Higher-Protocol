import {action, makeAutoObservable} from "mobx";
import {MENU_ITEMS} from "../constants/constants";


class AppStore {
	selectedMenu = MENU_ITEMS.DASHBOARD
	user = {
		displayName: ""
	}
	authToken = undefined
	
	constructor() {
		makeAutoObservable(this, {
			selectMenu: action,
			setAuthToken: action,
			setUser: action
		})
	}

	selectMenu(menu) {
		this.selectedMenu = menu || MENU_ITEMS.DASHBOARD
	}

	setAuthToken(token){
		this.authToken = token
	}

	setUser(user){
		this.user = user
		this.user.displayName = `${user.first_name} ${user.last_name.charAt(0)}.`
	}
}

const appStore = new AppStore()
export default appStore