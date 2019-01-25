import thunkMiddleware from "redux-thunk";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import app from "./reducers/appReducer";
import playerProfile from "./reducers/playerProfileReducer";
import gameList from "./reducers/gameListReducer";
import leaderboard from "./reducers/leaderboardReducer";
import AppRouter from "./containers/AppRouter";
import lang from "./config/text";

if (process.env.NODE_ENV !== "production") {
	console.log("Looks like we are in development mode!");
}
const reducers = {
	app,
	playerProfile,
	gameList,
	leaderboard,
	form: formReducer
};

const reducer = combineReducers(reducers);

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
	app: {
		selectedLanguage: "fr",
		availableLanguages: Object.keys(lang),
		lang: lang.fr,
		appList: [ ],
		appListError: false,
		token: token === null ? "" : token,
		user: ""
	},
	playerProfile: {
		fetching: false,
		login: "",
		username: "",
		score: 0,
		nbGames: 0,
		nbVictoires: 0,
		nbDefaites: 0,
	},
	gameList: {
		login: "",
		gameList: [ ]
	},
	leaderboard: {
		userlogin: "",
		userList: [ ]
	}
};

const store = createStore(
	reducer, initialState,
	composeWithDevTools(applyMiddleware(
		thunkMiddleware
	))
);

render(
	<Provider store={store}>
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	</Provider>,
	document.getElementById("app")
);
