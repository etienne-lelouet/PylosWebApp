import { endpoint } from "../config/config";
import lang from "../config/text";

export const APP_INVALIDATE_TOKEN = "APP_INVALIDATE_TOKEN";
export const APP_TOKEN = "APP_TOKEN";
export const APP_SIDEBAR_ERROR = "APP_SIDEBAR_ERROR";
export const APP_SIDEBAR_LISTAPPS = "APP_SIDEBAR_LISTAPPS";
export const APP_CHANGE_LANG = "APP_CHANGE_LANG";

export const invalidateToken = () => ({ type: APP_INVALIDATE_TOKEN });

export const appRegisterLogin = token => ({ type: APP_TOKEN, token });

export const appSidebarError = () => ({ type: APP_SIDEBAR_ERROR });

export const selectedApp = apps => ({ type: APP_SIDEBAR_LISTAPPS, apps });

export const changeLang = (selectedLang) => {
	if (!lang[selectedLang]) {
		return { type: APP_CHANGE_LANG, value: "fr" };
	}
	return { type: APP_CHANGE_LANG, value: selectedLang };
};

export const getApp = (token, appName) => (dispatch) => {
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token
		}
	};
	return fetch(`${endpoint.getApps}`, options).then(response => response.json().then((json) => {
		switch (response.status) {
			case 401:
				return dispatch(invalidateToken());
			case 404:
			case 400:
			case 500:
				return dispatch(appSidebarError());
			case 200:
				break;
			default:
				return dispatch(appSidebarError());
		}
		if (Array.isArray(json)) {
			let apps = {};
			if (Array.length > 0) {
				if (appName && json.find(elem => elem === appName)) {
					apps = { appList: json, selectedApp: appName };
				} else {
					const [ defaultSelectedApp ] = json;
					apps = { appList: json, selectedApp: defaultSelectedApp };
				}
			} else {
				apps = { appList: json, selectedApp: "" };
			}
			return dispatch(selectedApp(apps));
		}
		return 0;
	})).catch(() => dispatch(appSidebarError()));
};
