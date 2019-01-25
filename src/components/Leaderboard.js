import React from "react";

const Leaderboard = ({
	user,
	userList,
	usernameText,
	scoreText,
	nbPartiesText,
	nbVictoiresText,
	nbDefaitesText
}) => (
	<div>
		<ul>
		{userList.map((player)=> (
			<li><span key={player.login}>{player.username} {scoreText} : {player.score} {nbPartiesText} : {player.nbParties}  {nbVictoiresText} : {player.nbVictoires} {nbDefaitesText} : {player.nbDefaites} </span></li>
		) )}
		</ul>
	</div>
);

export default Leaderboard;
