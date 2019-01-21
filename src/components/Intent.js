import React from "react";
import PropTypes from "prop-types";
import { samplesNumberTriggerWarning, efficacityScoreTriggerWarning } from "../config/config";

const Intent = ({
	intent: {
		value,
		samplesNumber,
		efficacity,
		lastUpdate
	},
	handleClick
}) => {
	const date = (`0${lastUpdate.getDate()}`).slice(-2);
	const month = (`0${lastUpdate.getMonth() + 1}`).slice(-2);
	const hours = (`0${lastUpdate.getHours()}`).slice(-2);
	const minutes = (`0${lastUpdate.getMinutes()}`).slice(-2);
	const fullDate = `${date}/${month} à ${hours}:${minutes}`;
	const intentClassName = samplesNumber > samplesNumberTriggerWarning ? "intentSamplesNumberOk" : "intentSamplesNumberNOk";
	return (
		<tr className={efficacity > efficacityScoreTriggerWarning ? "intentRowValid" : "intentRowInvalid"} onClick={handleClick}>
			<td className={intentClassName}>{value}</td>
			<td className={intentClassName}>{samplesNumber}</td>
			<td className={intentClassName}>{Math.round(efficacity * 10000) / 100} %</td>
			<td className={intentClassName}>{fullDate}</td>
		</tr>
	);
};

Intent.propTypes = {
	handleClick: PropTypes.func.isRequired,
	intent: PropTypes.shape({
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
		page: PropTypes.number.isRequired
	}).isRequired
};


export default Intent;
