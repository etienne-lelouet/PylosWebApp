import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import SamplesUploadForm from "../components/SamplesUploadForm";
import {
	fetchIntentList, displaySamplesListError, hideErrors, addIntentToList
} from "../actions/actionsSamples";

class SamplesUploadFormContainer extends React.Component {
	constructor(props) {
		super(props);
		this.keyPressHandler = this.keyPressHandler.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	componentDidMount() {
		const { dispatch, match: { params: { appName, intentName } } } = this.props;
		dispatch(fetchIntentList(appName, intentName));
	}

	componentDidUpdate({ match: { params: { appName: appNamePrev } } }) {
		const {
			dispatch, match: {
				params: { appName: appNameThis }
			}
		} = this.props;
		if (appNamePrev !== appNameThis) {
			dispatch(fetchIntentList(appNameThis));
		}
	}

	handleCreate(onChange) {
		return (value) => {
			const { match: { params: { appName } }, history } = this.props;
			onChange(value)
			history.push(`/samplesUpload/${appName}/${value}`);
		}
	}

	keyPressHandler(e) {
		const { dispatch, formValues: { textAreaSamples, textAreaFallback } } = this.props;
		if (e.keyCode === 13 || e.keyCode === 8 || e.keyCode === 32 || e.keyCode === 9) {
			const samplesContents = textAreaSamples ? textAreaSamples.split("\n") : [];
			const fallbackContents = textAreaFallback ? textAreaFallback.split("\n") : [];
			const errors = [];
			if (samplesContents.length > 0) {
				samplesContents.forEach((line, i) => {
					if (line.length > 256) {
						errors.push({ field: "samples", line: i + 1, error: "lineIsTooLong" });
					}
				});
			}
			if (fallbackContents.length > 0) {
				fallbackContents.forEach((line, i) => {
					if (line.length > 256) {
						errors.push({ field: "fallback", line: i + 1, error: "lineIsTooLong" });
					}
				});
			}

			if (errors.length > 0) {
				dispatch(displaySamplesListError(errors));
			} else {
				dispatch(hideErrors());
			}
		}
	}

	render() {
		const {
			samplesIntents,
			token,
			messageSamples,
			messageSamplesText,
			messageSamplesType,
			samplesTextAreaLabel,
			samplesButtonLabel,
			fallbackTextAreaLabel,
			match: { params: { intentName, appName } }
		} = this.props;
		if (samplesIntents.length > 0) 	{
			const { keyPressHandler, handleCreate } = this;
			return (
				<SamplesUploadForm
					{...{
						samplesIntents,
						token,
						appName,
						intentName,
						messageSamples,
						messageSamplesText,
						messageSamplesType,
						samplesTextAreaLabel,
						samplesButtonLabel,
						fallbackTextAreaLabel,
						keyPressHandler,
						handleCreate
					}}
				/>);
		}
		return null;
	}
}

const mapStateToProps = state => ({
	samplesIntents: state.samples.samplesIntents,
	token: state.app.token,
	messageSamples: state.samples.messageSamples,
	messageSamplesText: state.samples.messageSamplesText,
	messageSamplesType: state.samples.messageSamplesType,
	samplesTextAreaLabel: state.app.lang.samplesTextAreaLabel,
	samplesButtonLabel: state.app.lang.samplesButtonLabel,
	fallbackTextAreaLabel: state.app.lang.fallbackTextAreaLabel
});

SamplesUploadFormContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	messageSamples: PropTypes.bool.isRequired,
	messageSamplesText: PropTypes.string.isRequired,
	samplesIntents: PropTypes.arrayOf(PropTypes.string),
	samplesTextAreaLabel: PropTypes.string.isRequired,
	samplesButtonLabel: PropTypes.string.isRequired,
	fallbackTextAreaLabel: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			intentName: PropTypes.string,
			appName: PropTypes.string
		})
	})
};

SamplesUploadFormContainer.defaultProps = {
	match: {
		params: {
			appName: "",
			intentName: ""
		}
	}
};

SamplesUploadFormContainer.defaultProps = {
	samplesIntents: []
};
export default withRouter(connect(mapStateToProps)(SamplesUploadFormContainer));
