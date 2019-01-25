import React from "react";

const PlayerProfile = props => (
	<div>
		<ul>
			<li>
				{props.usernameText}
				{" "}
				:
				{" "}
				{props.username}
			</li>
			<li>
				{props.scoreText}
				{" "}
				:
				{" "}
				{props.score}
			</li>
			<li>
				{props.nbPartiesText}
				{" "}
				:
				{" "}
				{props.NbParties}
			</li>
			<li>
				{props.nbVictoiresText}
				{" "}
				:
				{" "}
				{props.nbVictoires}
			</li>
			<li>
				{props.nbDefaitesText}
				{" "}
				:
				{" "}
				{props.nbDefaites}
			</li>
		</ul>
	</div>
);

export default PlayerProfile;
