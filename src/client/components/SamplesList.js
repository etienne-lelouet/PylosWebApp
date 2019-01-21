import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PREVINTENTSET, NEXTINTENTSET } from "../config/config";
import ButtonRefreshIntent from "../containers/ButtonRefreshIntent";

const SamplesList = ({
	samples, pageNumber, page, handleClick, value, appName, canRefresh, isRefreshing
}) => (
	<tr className="samplesList">
		<td className="buttonColumn">
			{page > 1
				? (
					<button className={PREVINTENTSET} onClick={handleClick} onKeyDown={handleClick} type="button">Prev Intent Set </button>
				)
				: null
			}
		</td>
		<td colSpan="2">
			<Link to={`/samplesUpload/${appName}/${value}`}><button type="button">Editer les samples</button></Link>
			<ButtonRefreshIntent {...{
				appName, intentValue: value, canRefresh, isRefreshing
			}}
			/>
			<ul>
				{samples.map((sample) => {
					const text = `${sample.text} : ${sample.validated ? "validé" : "non validé"}`;
					return (
						<li key={sample._id}>{text}</li>
					);
				})}
			</ul>
		</td>
		<td className="buttonColumn">
			{page < pageNumber && pageNumber > 1
				? (
					<button className={NEXTINTENTSET} onClick={handleClick} onKeyDown={handleClick} type="button">Next Intent Set </button>
				)
				: null}
		</td>
	</tr>
);

SamplesList.propTypes = {
	handleClick: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	appName: PropTypes.string.isRequired,
	pageNumber: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	samples: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		validated: PropTypes.bool.isRequired
	})).isRequired
};

export default SamplesList;
