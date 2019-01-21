import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SidebarContainer from "./SidebarContainer";
import SamplesUploadMain from "../components/SamplesUploadMain";

const Intents = ({
	match: { params: { appName } }, appList, samplesUploadTitle
}) => {
	const url = "/samplesUpload";
	const appIsValid = appList.includes(appName);
	return (
		<div className="samplesUploadApp">
			<SidebarContainer selectedApp={appName} url={url} />
			{appIsValid
				? <SamplesUploadMain selectedApp={appName} samplesUploadTitle={samplesUploadTitle} />
				: null}
		</div>
	);
};


Intents.propTypes = {
	appList: PropTypes.arrayOf(PropTypes.string).isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			appName: PropTypes.string
		})
	}),
	samplesUploadTitle: PropTypes.string.isRequired
};

Intents.defaultProps = {
	match: {
		params: {
			appName: ""
		}
	}
};

const mapStateToProps = state => ({
	appList: state.app.appList,
	samplesUploadTitle: state.app.lang.samplesUploadTitle
});

export default connect(mapStateToProps)(Intents);
