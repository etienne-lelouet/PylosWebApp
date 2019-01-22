import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	Route, withRouter, Switch
} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import App from "./App";
import "../styles/app.css";

const AppRouter = ({ isLogged }) => (
	<Switch>
		<Route path="/register" component={isLogged !== "" ? App : Register} />
		<Route path="/" component={isLogged !== "" ? App : Login} />
	</Switch>
);

AppRouter.propTypes = {
	isLogged: PropTypes.string
};

AppRouter.defaultProps = {
	isLogged: ""
};

const mapStateToProps = state => ({
	isLogged: state.app.token
});

export default withRouter(connect(mapStateToProps)(AppRouter));
