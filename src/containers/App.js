import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	Switch, Route, Redirect, withRouter
} from "react-router-dom";
import { getApp } from "../actions/actionsApp";
// import Footer from "../components/Footer";
import HeaderContainer from "./HeaderContainer";
import MainPage from "./PlayerProfileContainer";

class App extends React.Component {
	componentDidMount() {
		const { dispatch, token } = this.props;
		dispatch(getApp(token));
	}

	render() {
		return (
			<div className="app">
				<HeaderContainer />
				<Switch>
					<Route path="/playerProfile" component={MainPage} />
					{/* <Route path="/samplesUpload/:appName?/:intentName?" component={SamplesUpload} />
					<Route path="/intentList/:appName?/:orderBy?/:order?" component={Intents} /> */}
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
