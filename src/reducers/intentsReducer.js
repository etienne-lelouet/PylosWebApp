import {
	INTENTS_DATA_FETCHING,
	INTENTS_DATA_FETCHED,
	INTENTS_DATA_ERROR,
	INTENTS_DISPLAY_SAMPLES,
	INTENTS_DISPLAY_MESSAGE,
	INTENT_TOGGLE_REFRESH,
	INTENT_REFRESHED
} from "../actions/actionsIntents";

const intents = (state = {}, action) => {
	switch (action.type) {
		case INTENTS_DATA_FETCHING:
			return {
				...state,
				fetching: true
			};
		case INTENTS_DATA_FETCHED:
			return {
				...state,
				headers: action.values.headers,
				intents: action.values.intents,
				fetching: false,
				messageIntents: false,
				messageIntentsText: "",
				messageIntentsType: ""
			};
		case INTENTS_DATA_ERROR:
			return {
				...state,
				fetching: false
			};
		case INTENTS_DISPLAY_SAMPLES:
			return {
				...state,
				intents: [
					...state.intents.slice(0, action.values.index),
					{
						...state.intents[action.values.index],
						displaySamples: action.values.display,
						samples: action.values.samples,
						page: action.values.page,
						pageNumber: action.values.pageNumber
					},
					...state.intents.slice(action.values.index + 1)
				]
			};
		case INTENTS_DISPLAY_MESSAGE:
			return {
				...state,
				messageIntents: true,
				messageIntentsText: action.values.messageIntentsText,
				messageIntentsType: action.messageIntentsType.messageSamplesType
			};
		case INTENT_REFRESHED:
			return {
				...state,
				intents: [
					...state.intents.slice(0, action.values.index),
					{
						...state.intents[action.values.index],
						...action.values.intent
					},
					...state.intents.slice(action.values.index + 1)
				]
			};
		case INTENT_TOGGLE_REFRESH:
			return {
				...state,
				intents: [
					...state.intents.slice(0, action.value),
					{
						...state.intents[action.value],
						canRefresh: !state.intents[action.value].canRefresh,
						isRefreshing: !state.intents[action.value].isRefreshing
					},
					...state.intents.slice(action.value + 1)
				]
			};
		default:
			return state;
	}
};

export default intents;
