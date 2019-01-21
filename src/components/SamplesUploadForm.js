import React from "react";
import { Field, reduxForm } from "redux-form";
import RFReactSelect from "./RFReactSelect";
import { endpoint } from "../config/config";
import { generateMessage } from "../actions/actionsSamples";

class SamplesUploadForm extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	shouldComponentUpdate({ samplesIntents: samplesIntentsNext, intentName: intentNameNext }) {
		const { samplesIntents: samplesIntentsThis, intentName: intentNameThis } = this.props;
		return ((samplesIntentsNext.length !== samplesIntentsThis.length || intentNameNext !== intentNameThis));
	}

	submit({ intentSelect, textAreaSamples, textAreaFallback }) {
		const {
			token, appName, change, dispatch
		} = this.props;
		console.log("intentSelect", intentSelect);
		let intentSelectValid = "";

		if (!intentSelect || intentSelect === "") {
			dispatch(generateMessage("noIntents", "error"));
		} else {
			intentSelectValid = intentSelect;
		}
		console.log(intentSelectValid);
		if (!textAreaSamples || textAreaSamples === "") {
			dispatch(generateMessage("noSamples", "error"));
		}

		let fallbackValid;
		if (!textAreaFallback || textAreaFallback === "") {
			fallbackValid = [];
		} else {
			fallbackValid = textAreaFallback.split("\n");
		}

		const samplesArray = textAreaSamples.split("\n");

		const body = {
			appName,
			intentValue: intentSelectValid,
			samples: samplesArray,
			fallback: fallbackValid
		};

		fetch(endpoint.train, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token
			},
			body: JSON.stringify(body)
		}).then(response => response.json().then(() => {
			if (response.status !== 200) {
				dispatch(generateMessage("uploadError"));
			} else {
				dispatch(change("textAreaSamples", ""));
				dispatch(change("textAreaFallback", ""));
				dispatch(generateMessage("uploadSuccessful", "uploadSuccess"));
			}
		})).catch(() => dispatch(generateMessage("uploadError")));
	}

	renderTextArea({
		input, label, keyPressHandler
	}) {
		return (
			<div className="samplesList">
				<textarea {...input} placeholder={label} className="textAreaSamples" onKeyUp={keyPressHandler} />
			</div>
		);
	}

	render() {
		const {
			handleSubmit,
			samplesIntents,
			intentName,
			messageSamples,
			messageSamplesText,
			messageSamplesType,
			samplesTextAreaLabel,
			samplesButtonLabel,
			fallbackTextAreaLabel,
			keyPressHandler,
			handleCreate
		} = this.props;
		const options = samplesIntents.map(value => ({ value, label: value }));
		let fullOptionsList = [];
		if (intentName) {
			fullOptionsList = [ ...options, { value: intentName, label: intentName } ];
		} else {
			fullOptionsList = options;
		}
		return (
			<form onSubmit={handleSubmit(this.submit)} className="uploadForm">
				<Field name="intentSelect" customProps={{ handleCreate: handleCreate, initialValue: intentName }} component={RFReactSelect} options={fullOptionsList} className="reactSelect" />
				<div className="inputZone">
					<Field name="textAreaSamples" label={samplesTextAreaLabel} component={this.renderTextArea} keyPressHandler={keyPressHandler} />
					<Field name="textAreaFallback" label={fallbackTextAreaLabel} component={this.renderTextArea} keyPressHandler={keyPressHandler} />
				</div>
				{messageSamples ? <div className={messageSamplesType}>{messageSamplesText}</div> : null}
				<div>
					<button type="submit">{samplesButtonLabel}</button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: "uploadForm"
})(SamplesUploadForm);
