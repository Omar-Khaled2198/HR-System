import React, { Component } from "react";
import { StyleSheet, View, Alert, PermissionsAndroid } from "react-native";
import {
	Container,
	Header,
	Title,
	Right,
	Content,
	Button,
	Icon,
	Left,
	Body,
	Text,
	Card,
	Badge,
	CardItem
} from "native-base";
import moment from "moment";
import { UploadProfilePictureService } from "../../services/profile.service";
import Activity from "../../components/acitivity.com";
import Spinner from "react-native-loading-spinner-overlay";
import FirebaseHandler from "../../utils/firebase_handler.util";
import Events from "../../utils/events.util";
import Geolocation from "react-native-geolocation-service";
import { Avatar } from "react-native-elements";
import ServiceProvider from "../../utils/service_provider.utils";
class HomeScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
			is_loading: false,
		};
	}

	componentDidMount() {
		//FirebaseHandler.ListenToNotifications();
	}

	async CheckIn() {
		this.setState({ is_loading: true });
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Location Permission",
					message:
						"Location Permission" + "so you can use GPS location."
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				Geolocation.getCurrentPosition(
					async position => {
						const response = await ServiceProvider.POST(
							`check_in/${global.account._id}`,position.coords);
						if (response.status == 200) {
							this.setState({ is_loading: false });
							Alert.alert("Check in", "Checked in successfully.");
						} else {
							this.setState({ is_loading: false });
							Alert.alert("Check in", "Please try again.");
						}
					},
					error => console.log(error),
					{ enableHighAccuracy: true, timeout: 20000 }
				);
			} else {
				Alert.alert("Check in", "GPS location denied");
			}
		} catch (err) {
			console.warn(err);
		}
	}

	render() {
		return (
			<Container>
				<Header>
					<Left style={{ flex: 1 }}>
						<Button
							transparent
							onPress={() => {
								this.props.navigation.openDrawer();
							}}
						>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body style={{ flex: 1 }}>
						<Title style={{ alignSelf: "center" }}>Home</Title>
					</Body>
					<Right style={{ flex: 1 }} />
				</Header>
				<Content contentContainerStyle={styles.content}>
					<Spinner visible={this.state.is_loading} />
					<Avatar
						rounded
						size={130}
						source={
							global.account.profile.profile_picture === ""
								? require("../../assets/images/default_avatar.png")
								: {
										uri:
											global.account.profile
												.profile_picture
								  }
						}
					/>
					<Text style={{ marginTop: 10 }}>
						Hi, {global.account.profile.first_name}
					</Text>
					<Button
						block
						primary
						style={{ margin: 15, marginTop: 20 }}
						onPress={() => {
							this.CheckIn();
						}}
					>
						<Text style={{ color: "white" }} uppercase={false}>
							Check In
						</Text>
					</Button>
					<View>
						<Text>Working hours: 5:30</Text>
					</View>
					<Button
						block
						primary
						style={{ margin: 15, marginBottom: 0 }}
					>
						<Text style={{ color: "white" }} uppercase={false}>
							Check Out
						</Text>
					</Button>
					{/*<Text>Location: {this.state.location}</Text> */}
					{/* <Activity loading={true}/> */}
					{/* <Spinner visible={true} /> */}
					<Card transparent>
						<CardItem>
							<Text>Status: </Text>
							<Badge
								small
								success
								// warning={vacation.status === "Pending"}
								// danger={vacation.status === "Rejected"}
								// success={vacation.status === "Accepted"}
								// style={
								// 	vacation.status === "Aborted"
								// 		? { backgroundColor: "black" }
								// 		: {}
								// }
							>
								<Text uppercase={false}>Working</Text>
							</Badge>
						</CardItem>
					</Card>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		marginTop: 15,
		paddingRight: 30,
		paddingLeft: 30,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default HomeScreen;
