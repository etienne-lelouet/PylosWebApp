import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { endpoint } from "../config/config";
import { appRegisterLogin } from "../actions/actionsApp";

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	submit(values) {
		const { dispatch } = this.props;
		return fetch(endpoint.register, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				login: values.login,
				password: values.password,
				passwordConfirmation: values.passwordConfirmation,
				username: values.username
			})
		}).then(response => response.json().then((json) => {
			if (json.errors) {
				if (Array.isArray(json.errors)) {
					const errors = {};
					json.errors.forEach((error) => {
						if (error.type === "param") {
							errors[error.param] = error.msg;
						}
					});
					throw new SubmissionError(errors);
				} else {
					throw new SubmissionError({ _error: "registerError" });
				}
			} else if (json.token !== "") {
				localStorage.setItem("token", json.token);
				dispatch(appRegisterLogin(json.token));
			} else {
				throw new Error({});
			}
		}));
	}

	renderField({
		input, label, type, meta: { error }
	}) {
		return (
			<div className="inputField">
				<input {...input} placeholder={label} type={type} />
				{error && <span className="errorLogin">{error}</span>}
			</div>
		);
	}

	render() {
		const { handleSubmit, error } = this.props;
		return (
			<div className="loginFormContainer">
				<form onSubmit={handleSubmit(this.submit)} className="loginForm">
					<div className="logoContainer"><img src={require("../ressources/images/logo.png")} className="imgLogo" alt="logoKick" /></div>
					<Field name="login" component={this.renderField} type="text" label="login" />
					<Field name="password" component={this.renderField} type="password" label="Password" />
					<Field name="passwordConfirmation" component={this.renderField} type="password" label="password2" />
					<Field name="username" component={this.renderField} type="text" label="Username" />
					{error && <span className="errorLogin">{error}</span>}
					<div>
						<button type="submit">Register</button>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: "registerForm"
})(RegisterForm);
