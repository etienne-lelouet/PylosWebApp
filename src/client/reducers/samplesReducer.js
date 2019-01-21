import {
	SAMPLES_FETCHED_INTENTS, SAMPLES_DISPLAY_MESSAGE, SAMPLES_HIDE_MESSAGE, SAMPLES_ADD_INTENT
} from "../actions/actionsSamples";

const samples = (state = {}, action) => {
	switch (action.type) {
		case SAMPLES_FETCHED_INTENTS:
			return {
				...state,
				samplesIntents: action.values,
				networking: false
			};
		case SAMPLES_ADD_INTENT:
			return {
				...state,
				samplesIntents: [ ...state.samplesIntents, action.values ]
			};
		case SAMPLES_DISPLAY_MESSAGE:
			return {
				...state,
				messageSamples: true,
				messageSamplesText: action.values.messageSamplesText,
				messageSamplesType: action.values.messageSamplesType
			};
		case SAMPLES_HIDE_MESSAGE:
			return {
				...state,
				messageSamples: false,
				messageSamplesText: "",
				messageSamplesType: ""
			};
		default:
			return state;
	}
};

export default samples;
