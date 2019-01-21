/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import IntentContainer from "../containers/IntentContainer";
import Message from "./Message";

const IntentList = ({
	intents, headers, listOrder, handleReorder, intentsNumberText, samplesNumberText
}) => {
	if (typeof intents === "undefined") {
		return <Message messageType="error" message="" />;
	}
	const intentNumber = intents.length;
	const samplesNumber = (intentNumber === 0
		? 0
		: intents.map(item => item.samplesNumber).reduce((prev, next) => prev + next)
	);
	return (
		<div className="intentListContainer">
			<div className="statistics">
				{intentsNumberText} {intentNumber}, {samplesNumberText} : {samplesNumber}
			</div>
			<table className="intentTable">
				<tbody>
					<tr>
						{headers.map((header) => {
							if (listOrder.orderBy === header.key) {
								const text = `${header.value} (${listOrder.order === "asc" ? "asc" : "desc"})`;
								return (
									<th key={header.key} className="intentHeaderOrdered" data-key={header.key} onClick={handleReorder}>
										{text}
									</th>
								);
							}
							return (
								<th key={header.value} className="intentHeader" data-key={header.key} onClick={handleReorder}>
									{header.value}
								</th>
							);
						})}
					</tr>
				</tbody>
				{intents.map(intent => (
					<IntentContainer key={intent.value} intent={intent} />
				))}
			</table>
		</div>
	);
};

IntentList.propTypes = {
	handleReorder: PropTypes.func.isRequired,
	intentsNumberText: PropTypes.string.isRequired,
	samplesNumberText: PropTypes.string.isRequired,
	listOrder: PropTypes.shape({
		order: PropTypes.string,
		orderBy: PropTypes.string
	}).isRequired,
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
	headers: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string,
		value: PropTypes.string
	})).isRequired
};

export default IntentList;
