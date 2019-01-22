import thunkMiddleware from "redux-thunk";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Provider } from "react-redux";
import app from "./reducers/appReducer";
import AppRouter from "./containers/AppRouter";
import lang from "./config/text";

if (process.env.NODE_ENV !== "production") {
	console.log("Looks like we are in development mode!");
}
const reducers = {
	app,
	form: formReducer
};

const reducer = combineReducers(reducers);

const token = localStorage.getItem("token");

const initialState = {
	app: {
		selectedLanguage: "fr",
		availableLanguages: Object.keys(lang),
		lang: lang.fr,
		appList: [ ],
		appListError: false,
		token: token === null ? "" : token
	}
};

const store = createStore(
	reducer, initialState,
	applyMiddleware(
		thunkMiddleware
	)
);

render(
	<Provider store={store}>
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	</Provider>,
	document.getElementById("app")
);
