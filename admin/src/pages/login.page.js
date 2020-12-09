import React, { Component } from "react";
import ServiceProvider from "../utils/service_provider.utils";
import axios from "axios";
import FirebaseHandler from "../utils/firebase_handler.util";
class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "omar@gmail.com",
			password: "123456789",
			error: "",
			loading: true
		};
	}

	componentDidMount(){
		document.title = process.env.REACT_APP_NAME;
		const account = JSON.parse(localStorage.getItem("account"))
		if(account != null && account.token){
			axios.defaults.headers.common['authorization'] = account.token;
			this.props.history.push("/admin");
		}
	}

	async SignIn() {
		const user = {
			email: this.state.email,
			password: this.state.password
		}
		const response = await ServiceProvider.POST(`sign_in`,user);
		if(response.status == 200){
			localStorage.setItem("account",JSON.stringify(response.data));
			axios.defaults.headers.common['authorization'] = response.data.token;
			await FirebaseHandler.Authenticate();
			this.props.history.push("/admin");
		} else {
			console.log(response.data.msg);
		}
	}

	render() {
		return (
			<div className="login-box">
				<div className="login-logo">
					<b>HR</b>System
				</div>
				<div className="login-box-body">
					<p className="login-box-msg">
						Sign in to start your session
					</p>
						<div className="form-group has-feedback">
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								value={this.state.email}
								onChange={event => {
									this.setState({ email:event.target.value });
								}}
							/>
							<span className="glyphicon glyphicon-envelope form-control-feedback" />
						</div>
						<div className="form-group has-feedback">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								value={this.state.password}
								onChange={event => {
									this.setState({ password:event.target.value });
								}}
							/>
							<span className="glyphicon glyphicon-lock form-control-feedback" />
						</div>
						<div className="row">
							<div className="col-xs-8">
								<div className="checkbox icheck">
									<label>
										<input type="checkbox" /> Remember Me
									</label>
								</div>
							</div>
							{/* /.col */}
							<div className="col-xs-4">
								<button className="btn btn-primary btn-block btn-flat" onClick={() => this.SignIn()}>
									Sign In
								</button>
							</div>
							{/* /.col */}
						</div>
					{/* /.social-auth-links */}
					<a href="#">I forgot my password</a>
					<br />
				</div>
				{/* /.login-box-body */}
			</div>
		);
	}
}

export default LoginPage;
