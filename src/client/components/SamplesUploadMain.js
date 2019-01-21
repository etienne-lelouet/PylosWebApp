import React from "react";
import propTypes from "prop-types";
import SamplesUploadFormContainer from "../containers/SamplesUploadFormContainer";

const SamplesUploadContainer = ({ selectedApp, samplesUploadTitle }) => (
	<div className="samplesUploadMain">
		<div className="samplesUploadTopPart">
			<span className="samplesUploadTitle">
				{samplesUploadTitle}
				{selectedApp}
			</span>
		</div>
		<SamplesUploadFormContainer />
	</div>
);

SamplesUploadContainer.propTypes = {
	selectedApp: propTypes.string.isRequired,
	samplesUploadTitle: propTypes.string.isRequired
};

export default SamplesUploadContainer;
