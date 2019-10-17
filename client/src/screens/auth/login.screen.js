import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
	Container,
	Button,
	Content,
	Form,
	Item,
	Input,
	Label
} from "native-base";
import ServiceProivder from "../../utils/service_provider.utils";
import { SetAccountGlobal } from "../../utils/global.util";
import StorageManger from "../../utils/storage_manager.utils";
import FirebaseHandler from "../../utils/firebase_handler.util";
import Spinner from "react-native-loading-spinner-overlay";
class LoginScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
			email: "omar2@gmail.com",
			password: "123456789",
			error: "",
			is_loading: true
		};
	}

	async componentDidMount() {
		const account = await StorageManger.Fetch("account");
		if (account!=null && account.token) {
			SetAccountGlobal(account);
			if (Object.keys(account.profile).length) {

				
				const response = await ServiceProivder.POST("sign_in", {
					email: this.state.email,
					password: this.state.password
				});
				if (response.status === 200) {
					SetAccountGlobal(response.data);
					await FirebaseHandler.Authenticate();
					
				}
				this.props.navigation.navigate("Home");
            }
            
		}
		this.setState({ is_loading: false });
	}

	async SignIn() {
		if (this.state.email === "" || this.state.password === "") {
			this.setState({ error: "Email and password can't be empty!" });
		} else {
			const response = await ServiceProivder.POST("sign_in", {
				email: this.state.email,
				password: this.state.password
			});
			if (response.status !== 200) {
				this.setState({ error: response.data.msg });
			} else {
				SetAccountGlobal(response.data);
				await FirebaseHandler.Authenticate();
				const device_token = await FirebaseHandler.GetToken();
				console.log(device_token)
				const res = await ServiceProivder.PUT(`accounts/${global.account._id}`,{device_token});
				console.log(res);
				await StorageManger.Store("account", response.data);
				if (Object.keys(response.data.profile).length==0) {
					this.props.navigation.navigate("ProfileCreation");
				} else {
					this.props.navigation.navigate("Home");
				}
			}
		}
	}

	render() {
		return (
			<Container style={styles.content}>
					<Content>
					<Spinner visible={this.state.is_loading} />
						<Text style={styles.title}>HR System</Text>
						<Form style={styles.form}>
							<Item>
								<Label>Email</Label>
								<Input
									textContentType={"emailAddress"}
									value={this.state.email}
									onChangeText={email => {
										this.setState({ email });
									}}
								/>
							</Item>
							<Item>
								<Label>Password</Label>
								<Input
									textContentType={"password"}
									value={this.state.password}
									onChangeText={password => {
										this.setState({ password });
									}}
									secureTextEntry={true}
								/>
							</Item>
							{this.state.error !== "" && (
								<Text style={styles.error}>
									{this.state.error}
								</Text>
							)}
							<Button
								style={styles.login_button}
								block
								primary
								onPress={() => this.SignIn()}
							>
								<Text style={styles.login_text}>Login</Text>
							</Button>

							<Text
								style={styles.forget_password}
								onPress={() =>
									this.props.navigation.navigate(
										"ForgetPassword"
									)
								}
							>
								Forget your password?
							</Text>
							<Text
								style={styles.signup_ref}
								onPress={() =>
									this.props.navigation.navigate("SignUp")
								}
							>
								Don't have account?
								<Text
									style={{ textDecorationLine: "underline" }}
								>
									{" "}
									Sign Up
								</Text>
							</Text>
						</Form>
					</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 50,
		alignSelf: "center",
		marginTop: 80
	},
	content: {
		flexDirection: "column",
		justifyContent: "center",
		alignContent: "center"
	},
	form: {
		marginTop: 30,
		paddingRight: 35,
		paddingLeft: 35
	},
	login_button: {
		marginTop: 30,
		marginLeft: 15
	},
	login_text: {
		color: "white"
	},
	signup_ref: {
		alignSelf: "center",
		marginTop: 20,
		marginLeft: 15
	},
	forget_password: {
		alignSelf: "center",
		marginTop: 20,
		marginLeft: 15,
		textDecorationLine: "underline"
	},
	error: {
		marginTop: 20,
		color: "red",
		marginLeft: 15
	}
});
export default LoginScreen;
