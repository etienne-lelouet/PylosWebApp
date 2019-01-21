import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import IntentList from "../components/IntentList";
import Message from "../components/Message";
import Button from "./Button";
import {
	SAMPLESNUMBER, VALUE, LASTUPDATE, EFFICACITY
} from "../config/config";
import { intentsfetchListIfNeeded } from "../actions/actionsIntents";

class IntentListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.reorderList = this.reorderList.bind(this);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
	}

	componentDidMount() {
		const { dispatch, selectedApp } = this.props;
		dispatch(intentsfetchListIfNeeded(selectedApp));
	}

	componentDidUpdate(nextProps) {
		const { dispatch, selectedApp } = this.props;
		if (nextProps.selectedApp !== selectedApp) {
			dispatch(intentsfetchListIfNeeded(selectedApp));
		}
	}

	handleRefreshClick() {
		const { dispatch, match: { params: { appName } } } = this.props;
		dispatch(intentsfetchListIfNeeded(appName));
	}

	reorderList(e) {
		const { match: { params: { appName, orderBy, order: currentOrder } }, history } = this.props;
		const { target: { dataset: { key } } } = e;
		if (key !== orderBy) {
			history.push(`/intentList/${appName}/${key}/asc`);
		} else if (key === orderBy) {
			let order = "";
			if (!currentOrder) {
				order = "asc";
			} else {
				order = currentOrder === "asc" ? "desc" : "asc";
			}
			history.push(`/intentList/${appName}/${key}/${order}`);
		}
	}

	orderList(key, order, intents) {
		switch (key) {
			case VALUE:
				return intents.sort((a, b) => {
					const valueA = a.value.toLowerCase();
					const valueB = b.value.toLowerCase();
					if (order === "asc") {
						return valueA < valueB ? -1 : 1;
					}
					return valueA > valueB ? -1 : 1;
				});
			case SAMPLESNUMBER:
				return intents.sort((a, b) => (order === "asc" ? a.samplesNumber - b.samplesNumber : b.samplesNumber - a.samplesNumber));
			case EFFICACITY:
				return intents.sort((a, b) => (order === "asc" ? a.efficacity - b.efficacity : b.efficacity - a.efficacity));
			case LASTUPDATE:
				return intents.sort((a, b) => {
					if (order === "asc") {
						if (a.lastUpdate < b.lastUpdate) {
							return -1;
						}
						return 1;
					}
					if (a.lastUpdate > b.lastUpdate) {
						return -1;
					}
					return 1;
				});
			default:
				return intents.sort((a, b) => (order === "asc" ? a.efficacity - b.efficacity : b.efficacity - a.efficacity));
		}
	}

	render() {
		const {
			messageIntents,
			messageIntentsText,
			messageIntentsType,
			refresh,
			refreshing,
			intentListText,
			intents,
			headers,
			intentsNumberText,
			samplesNumberText,
			match: { params: { orderBy: urlOrderBy, order: urlOrder } }
		} = this.props;
		const allKeys = [ SAMPLESNUMBER, VALUE, LASTUPDATE, EFFICACITY ];

		let sortedList = [];
		let orderBy = "";
		let order;

		if (!allKeys.includes(urlOrderBy)) {
			orderBy = EFFICACITY;
		} else {
			orderBy = urlOrderBy;
		}

		if (urlOrder !== "asc" && urlOrder !== "desc") {
			order = "asc";
		} else {
			order = urlOrder;
		}

		sortedList = this.orderList(orderBy, order, intents);
		const listOrder = { order, orderBy };
		const intentListProps = {
			intents: sortedList,
			headers,
			listOrder,
			handleReorder: this.reorderList,
			intentsNumberText,
			samplesNumberText
		};
		const buttonProps = {
			handleRefreshClick: this.handleRefreshClick,
			text: { refresh, refreshing }
		};

		return (
			<div className="intentMainContainer">

				<div className="intentTopContainer">
					<span className="intentTitle">{intentListText}</span>
					{messageIntents
						? <Message message={messageIntentsText} messageType={messageIntentsType} />
						: null}
					<Button {...buttonProps} />

				</div>

				<IntentList {...intentListProps} />

			</div>
		);
	}
}

IntentListContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	messageIntents: PropTypes.bool.isRequired,
	messageIntentsText: PropTypes.string.isRequired,
	messageIntentsType: PropTypes.string.isRequired,
	refresh: PropTypes.string.isRequired,
	refreshing: PropTypes.string.isRequired,
	intentListText: PropTypes.string.isRequired,
	intentsNumberText: PropTypes.string.isRequired,
	samplesNumberText: PropTypes.string.isRequired,
	intents: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		displaySamples: PropTypes.bool.isRequired,
		efficacity: PropTypes.number.isRequired,
		lastUpdate: PropTypes.instanceOf(Date),
		samplesNumber: PropTypes.number.isRequired,
		value: PropTypes.string.isRequired,
		pageNumber: PropTypes.number.isRequired,
		page: PropTypes.number.isRequired
	})).isRequired,
	selectedApp: PropTypes.string.isRequired,
	headers: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string,
		value: PropTypes.string
	})).isRequired
};

const mapStateToProps = state => ({
	messageIntents: state.intents.messageIntents,
	messageIntentsText: state.intents.messageIntentsText,
	messageIntentsType: state.intents.messageIntentsType,
	refresh: state.app.lang.refresh,
	refreshing: state.app.lang.refreshing,
	intentListText: state.app.lang.intentListText,
	intentsNumberText: state.app.lang.intentsNumberText,
	samplesNumberText: state.app.lang.samplesNumberText,
	intents: state.intents.intents,
	headers: state.intents.headers
});

export default withRouter(connect(mapStateToProps)(IntentListContainer));
