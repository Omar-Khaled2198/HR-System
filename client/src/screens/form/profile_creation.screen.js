import React, { Component } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import {
	Container,
	Button,
	Content,
	Header,
	Textarea,
	Title,
	Right,
	Icon,
	Left,
	Body,
	Form,
	Item,
	Input,
	Label
} from "native-base";
import { Avatar } from "react-native-elements";
import ServiceProvider from "../../utils/service_provider.utils";
import StorageManger from "../../utils/storage_manager.utils";
import { SetAccountGlobal } from "../../utils/global.util";
import ImagePicker from "react-native-image-picker";

class ProfileCreationScreen extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			first_name: "",
			last_name: "",
			job_title: "",
			profile_picture: "",
			error: "",
			loading: true
		};
	}

	async Upload() {
		const options = {
			title: "Select Image",
			storageOptions: {
				skipBackup: true,
				path: "images"
			}
		};

		var response = "";
		ImagePicker.showImagePicker(options, async response => {
			const data = new FormData();
			data.append("profile_picture", {
				uri: response.uri,
				type: "image/jpeg",
				name: response.fileName
			});
			response = await ServiceProvider.POST(
				`accounts/${global.account._id}/profile_picture`,
				data,
				{ "content-type": "multipart/form-data" }
			);
			if (response.status == 200) {
				this.setState({ profile_picture: response.data.url });
			} else {
				Alert.alert("Request Vacation", response.data.msg);
			}
		});
	}

	async CreateProfile() {
		const response = await ServiceProvider.PUT(
			`accounts/${global.account._id}`,
			{
				profile: {
					first_name: this.state.first_name,
					last_name: this.state.last_name,
					job_title: this.state.job_title,
					profile_picture: this.state.profile_picture
				}
			}
		);

		if (response.status !== 200) {
			this.setState({ error: response.data.msg });
		} else {
			var account = global.account;
			account.profile = response.data.profile;
			SetAccountGlobal(account);
			await StorageManger.Store("account", account);
			Alert.alert("Success", response.data.msg, [
				{
					text: "OK",
					onPress: () => {
						this.props.navigation.navigate("Home");
					}
				}
			]);
			//this.props.navigation.navigate('Home')
		}
	}

	render() {
		return (
			<Container style={styles.content}>
				<Header>
					<Left style={{ flex: 1 }}>
						<Button
							transparent
							onPress={() => this.props.navigation.goBack()}
						>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body style={{ flex: 1 }}>
						<Title style={{ alignSelf: "center" }}>
							Create Profile
						</Title>
					</Body>
					<Right style={{ flex: 1 }} />
				</Header>
				<Content>
					<Form style={styles.form}>
						<Avatar
							rounded
							size={130}
							source={
								this.state.profile_picture == ""
									? require("../../assets/images/default_profile_picture.png")
									: { uri: this.state.profile_picture }
							}
							showEditButton
							onEditPress={() => {
								this.Upload();
							}}
						/>
						<Item style={{ marginTop: 30 }}>
							<Label>First Name</Label>
							<Input
								textContentType={"name"}
								value={this.state.first_name}
								onChangeText={first_name => {
									this.setState({ first_name });
								}}
							/>
						</Item>
						<Item>
							<Label>Last Name</Label>
							<Input
								textContentType={"name"}
								value={this.state.last_name}
								onChangeText={last_name => {
									this.setState({ last_name });
								}}
							/>
						</Item>
						<Item>
							<Label>Job Title</Label>
							<Input
								textContentType={"name"}
								value={this.state.job_title}
								onChangeText={job_title => {
									this.setState({ job_title });
								}}
							/>
						</Item>
						<Button
							style={styles.create_button}
							block
							primary
							onPress={() => this.CreateProfile()}
						>
							<Text style={styles.create_text}>Create</Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flexDirection: "column",
		justifyContent: "center",
		alignContent: "center"
	},
	form: {
		marginTop: 30,
		paddingRight: 35,
		paddingLeft: 35,
		alignItems: "center"
	},

	create_button: {
		marginTop: 35,
		marginLeft: 15
	},
	create_text: {
		color: "white"
	}
});

export default ProfileCreationScreen;
