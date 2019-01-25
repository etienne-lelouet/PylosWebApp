import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	Switch, Route, Redirect, withRouter
} from "react-router-dom";
// import Footer from "../components/Footer";
import HeaderContainer from "./HeaderContainer";
import PlayerProfileContainer from "./PlayerProfileContainer";

class App extends React.Component {
	componentDidMount() {
		const { dispatch, token } = this.props;
	}

	render() {
		return (
			<div className="app">
				<HeaderContainer />
				<Switch>
					<Route path="/playerProfile/:playerName?" component={PlayerProfileContainer} />
					<Route path="/leaderboards" component={PlayerProfileContainer} />
					<Route path="/" render={() => <Redirect to="/playerProfile" />} />
				</Switch>
			</div>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	token: state.app.token,
	selectedLanguage: state.app.selectedLanguage
});

export default withRouter(connect(mapStateToProps)(App));
