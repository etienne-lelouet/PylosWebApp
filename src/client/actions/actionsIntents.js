import { invalidateToken } from "./actionsApp";
import { endpoint } from "../config/config";

export const INTENTS_DATA_FETCHING = "INTENTS_DATA_FETCHING";
export const INTENTS_DATA_FETCHED = "INTENTS_DATA_FETCHED";
export const INTENTS_DATA_ERROR = "INTENTS_DATA_ERROR";
export const INTENTS_DISPLAY_SAMPLES = "INTENTS_DISPLAY_SAMPLES";
export const INTENTS_DISPLAY_MESSAGE = "INTENTS_DISPLAY_MESSAGE";
export const INTENT_REFRESHED = "INTENT_REFRESHED";
export const INTENT_TOGGLE_REFRESH = "INTENT_TOGGLE_REFRESH";

export const intentsFetchData = () => ({ type: INTENTS_DATA_FETCHING });

export const intentsReturnFetchedData = values => ({ type: INTENTS_DATA_FETCHED, values });

export const intentsDataError = ({ type: INTENTS_DATA_ERROR });

export const displayMessage = (messageSamplesText, messageSamplesType) => (
	{ type: INTENTS_DISPLAY_MESSAGE, values: { messageSamplesText, messageSamplesType } }
);

export const intentDisplaySamples = (index, samples, pageNumber, page, display) => ({
	type: INTENTS_DISPLAY_SAMPLES,
	values: {
		index, samples, pageNumber, page, display
	}
});

export const intentToggleRefresh = index => ({
	type: INTENT_TOGGLE_REFRESH,
	value: index
});

export const intentRefresh = (index, intent) => ({
	type: INTENT_REFRESHED,
	values: { index, intent }
});

export const generateMessage = (messageCode, type) => (dispatch, getState) => {
	const { app: { lang } } = getState();
	const messageText = lang[messageCode];
	console.log(messageText);
	dispatch(displayMessage(messageText, type));
};


export const callAPI = (token, selectedApp) => (dispatch, getState) => {
	const { app: { selectedLanguage } } = getState();
	dispatch(intentsFetchData());
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token
		}
	};
	return fetch(`${endpoint.getIntents}?appName=${selectedApp}`, options).then(response => response.json().then((json) => {
		switch (response.status) {
			case 401:
				return dispatch(invalidateToken());
			case 400:
			case 500:
				dispatch(intentsDataError());
				return dispatch(generateMessage("internalServerError", "error"));
			case 200:
				break;
			default:
				dispatch(intentsDataError());
				return dispatch(generateMessage("unknownError", "error"));
		}
		const now = new Date();
		const intents = json.values.map(({
			_id, value, samplesNumber, efficacity, lastUpdate
		}) => (
			{
				_id,
				value,
				samplesNumber,
				efficacity,
				lastUpdate: new Date(lastUpdate),
				displaySamples: false,
				page: 1,
				pageNumber: 0,
				canRefresh: ((now - new Date(lastUpdate)) / 1000 > 30),
				isRefreshing: false
			}
		));
		const { headers: { [selectedLanguage]: headers } } = json;
		return dispatch(intentsReturnFetchedData({ headers, intents }));
	})).catch(() => dispatch(generateMessage("unknownError", "error")));
};

export const getUpdatedIntent = (appName, intentValue, token) => (dispatch, getState) => {
	const { intents: { intents } } = getState();
	const index = intents.findIndex(({ value }) => intentValue === value);
	dispatch(intentToggleRefresh(index));
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token
		}
	};
	return fetch(`${endpoint.refreshIntent}?appName=${appName}&intentValue=${intentValue}`, options).then(response => response.json().then((json) => {
		switch (response.status) {
			case 401:
				return dispatch(invalidateToken());
			case 400:
			case 500:
				dispatch(intentsDataError());
				return dispatch(generateMessage("internalServerError", "error"));
			case 200:
				break;
			default:
				dispatch(intentsDataError());
				return dispatch(generateMessage("unknownError", "error"));
		}
		const intent = {
			...json, canRefresh: false, isRefreshing: false, lastUpdate: new Date(json.lastUpdate)
		};
		setTimeout(() => (dispatch(intentToggleRefresh(index))), 30000);
		return dispatch(intentRefresh(index, intent));
	})).catch(() => dispatch(generateMessage("unknownError", "error")));
};

const intentGetSamples = (_id, token, page = 1) => {
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token
		}
	};
	return fetch(`${endpoint.getSamples}?_id=${_id}&page=${page}`, options).then((response) => {
		switch (response.status) {
			case 200:
				break;
			default:
				return generateMessage("unknownError", "error");
		}
		return response.json();
	});
};

export const displaySamples = _id => (dispatch, getState) => {
	const { intents: { intents }, app: { token } } = getState();
	const index = intents.findIndex(({ _id: intentId }) => intentId === _id);
	if (intents[index].displaySamples) {
		return dispatch(intentDisplaySamples(index, [], 0, 1, false));
	}
	return intentGetSamples(_id, token).then(({ samples, pageNumber }) => {
		dispatch(intentDisplaySamples(index, samples, pageNumber, 1, true));
	});
};

export const changePage = (_id, page, pageNumber, next) => (dispatch, getState) => {
	const { intents: { intents }, app: { token } } = getState();
	const index = intents.findIndex(({ _id: intentId }) => intentId === _id);
	if (!intents[index].displaySamples) {
		return dispatch(displaySamples(_id));
	}
	let nextPage = page;
	if (next) {
		nextPage = page + 1 > pageNumber ? page : page + 1;
	} else {
		nextPage = page - 1 < 1 ? page : page - 1;
	}
	return intentGetSamples(_id, token, nextPage).then(
		({ samples, pageNumber: returnedPageNumber }) => {
			if (samples && pageNumber) {
				dispatch(intentDisplaySamples(index, samples, returnedPageNumber, nextPage, true));
			}
		}
	);
};

const intentsShouldFetchList = ({ intents: { fetching } }) => {
	if (fetching) {
		return false;
	}
	return true;
};

export const intentsfetchListIfNeeded = selectedApp => (dispatch, getState) => {
	// on ne recupère la liste que si on n'est pas déjà en train de récupérer une liste
	if (intentsShouldFetchList(getState())) {
		const { app: { token, selectedLanguage } } = getState();
		return (dispatch(callAPI(token, selectedApp, selectedLanguage)));
	}
	return Promise.resolve();
};
