import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Intent from "../components/Intent";
import SamplesList from "../components/SamplesList";
import { displaySamples, changePage } from "../actions/actionsIntents";
import { PREVINTENTSET, NEXTINTENTSET } from "../config/config";

class IntentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickIntent = this.handleClickIntent.bind(this);
		this.handleClickSamples = this.handleClickSamples.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		const { intent } = this.props;
		return JSON.stringify(intent) !== JSON.stringify(nextProps.intent);
	}

	handleClickIntent(e) {
		e.preventDefault();
		const { dispatch, intent: { _id } } = this.props;
		dispatch(displaySamples(_id));
	}

	handleClickSamples(e) {
		e.preventDefault();
		const { dispatch, intent: { _id, pageNumber, page } } = this.props;
		const className = e.target.attributes.class.value;
		let next = true;
		if (className === NEXTINTENTSET) {
			next = true;
		} else if (className === PREVINTENTSET) {
			next = false;
		}
		dispatch(changePage(_id, page, pageNumber, next));
	}

	render() {
		const {
			intent, intent: {
				value, samples, displaySamples: boolDisplaySamples, pageNumber, page, canRefresh, isRefreshing
			},
			match: { params: { appName } }
		} = this.props;
		console.log(boolDisplaySamples);
		return (
			<tbody>
				<Intent intent={intent} handleClick={this.handleClickIntent} />
				{boolDisplaySamples ? (
					<SamplesList {...{
						value, appName, samples, pageNumber, canRefresh, isRefreshing, page, handleClick: this.handleClickSamples
					}}
					/>
				) : null}
			</tbody>
		);
	}
}

IntentContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	intent: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		displaySamples: PropTypes.bool.isRequired,
		efficacity: PropTypes.number.isRequired,
		lastUpdate: PropTypes.instanceOf(Date),
		samples: PropTypes.arrayOf(PropTypes.shape({
			_id: PropTypes.string,
			text: PropTypes.string,
			validated: PropTypes.bool
		})),
		samplesNumber: PropTypes.number.isRequired,
		value: PropTypes.string.isRequired,
		pageNumber: PropTypes.number.isRequired,
		page: PropTypes.number.isRequired,
		canRefresh: PropTypes.bool.isRequired,
		isRefreshing: PropTypes.bool.isRequired
	}).isRequired
};


export default withRouter(connect()(IntentContainer));
