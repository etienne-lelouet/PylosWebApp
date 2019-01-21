import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUpdatedIntent } from "../actions/actionsIntents";

class ButtonRefreshIntent extends React.Component {
	constructor(props) {
		super(props);
		this.refreshIntent = this.refreshIntent.bind(this);
	}

	refreshIntent() {
		const {
			dispatch, appName, intentValue, token
		} = this.props;
		dispatch(getUpdatedIntent(appName, intentValue, token));
	}

	render() {
		const { refreshText, refreshingText, canRefresh, isRefreshing } = this.props;
		return (
			<button
				type="button"
				onClick={this.refreshIntent}
				disabled={!canRefresh}
			>
				{ isRefreshing ? refreshingText : refreshText }
			</button>
		);
	}
}
const mapStateToProps = state => ({
	refreshText: state.app.lang.refresh,
	refreshingText: state.app.lang.refreshing,
	token: state.app.token
});

ButtonRefreshIntent.propTypes = {
	appName: PropTypes.string.isRequired,
	intentValue: PropTypes.string.isRequired,
	refreshText: PropTypes.string.isRequired,
	refreshingText: PropTypes.string.isRequired,
	canRefresh: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
	isRefreshing: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(ButtonRefreshIntent);
