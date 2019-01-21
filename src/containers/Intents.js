import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IntentListContainer from "./IntentListContainer";
import SidebarContainer from "./SidebarContainer";

const Intents = (props) => {
	const {
		match: { params: { appName } }, appList
	} = props;
	const url = "/intentList";
	const appIsValid = appList.includes(appName);

	return (
		<div className="intentListApp">
			<SidebarContainer selectedApp={appName} url={url} />
			{appIsValid ? <IntentListContainer selectedApp={appName} /> : null}
		</div>
	);
};

Intents.propTypes = {
	appList: PropTypes.arrayOf(PropTypes.string).isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			appName: PropTypes.string
		})
	})
};

Intents.defaultProps = {
	match: {
		params: {
			appName: ""
		}
	}
};

const mapStateToProps = state => ({
	appList: state.app.appList
});

export default connect(mapStateToProps)(Intents);
