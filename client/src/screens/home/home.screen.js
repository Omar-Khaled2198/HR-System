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
import Activity from "../../components/acitivity.com";
import Spinner from "react-native-loading-spinner-overlay";
import Geolocation from "react-native-geolocation-service";
import { Avatar } from "react-native-elements";
import ServiceProvider from "../../utils/service_provider.utils";
import { SetAccountGlobal } from "../../utils/global.util";
class HomeScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
			is_loading_spinner: false,
			is_loading_activity: true,
			check_in_disabled: false,
			check_out_disabled: true,
			check_in: "",
			check_out: "",
			status: ""
		};
	}

	async componentDidMount() {
		const response = await ServiceProvider.GET(
			`attendance?employee=${global.account._id}&day=${moment().format(
				"D"
			)}&month=${moment().format("M")}&year=${moment().format("Y")}`
		);

		if (response.status == 200) {
			if (response.data.length != 0) {
				var account = global.account;
				account.attandance = response.data[0];
				SetAccountGlobal(account);
				this.UpdateState(response.data[0]);
			} else {
				this.setState({ is_loading_activity: false });
			}
		} else {
			this.setState({ is_loading_activity: false });
		}
	}

	UpdateState(attandance) {
		this.setState({
			check_in: attandance.check_in,
			check_in_disabled: attandance.check_in? true : false,
			check_out: attandance.check_out,
			check_out_disabled: attandance.check_out ||  !attandance.check_in ? true : false,
			status: attandance.status,
			is_loading_activity: false
		});
	}

	async GetLocation(callback) {
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
					(position)=>{callback(position)},
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

	async CheckIn() {
		this.setState({ is_loading_spinner: true });
		this.GetLocation(async (position)=>{
			const response = await ServiceProvider.POST(
				`check_in/${global.account._id}`,
				position.coords
			);
			if (response.status == 200) {
				this.setState({ is_loading_spinner: false });
				this.UpdateState(response.data);
				Alert.alert("Check in", "Checked in successfully.");
			} else {
				this.setState({ is_loading_spinner: false });
				Alert.alert("Check in", "Please try again.");
			}
		});
	}

	async CheckOut() {
		this.setState({ is_loading_spinner: true });
		this.GetLocation(async (position)=>{
			const response = await ServiceProvider.POST(
				`check_out/${global.account._id}`,
				position.coords
			);
			if (response.status == 200) {
				this.setState({ is_loading_spinner: false });
				this.UpdateState(response.data);
				Alert.alert("Check out", "Checked out successfully.");
			} else {
				this.setState({ is_loading_spinner: false });
				Alert.alert("Check out", "Please try again.");
			}
		});
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
				<Content
					scrollEnabled={true}
					contentContainerStyle={styles.content}
				>
					<Spinner visible={this.state.is_loading_spinner} />
					<Avatar
						rounded
						size={120}
						source={require("../../assets/images/default_avatar.png")}
					/>
					<Text style={{ marginTop: 10, fontWeight: "bold" }}>
						Hi, {global.account.profile.first_name}
					</Text>
					<Activity loading={this.state.is_loading_activity} />
					{!this.state.is_loading_activity && (
						<View
							style={{
								width: "100%",
								padding: 20,
								flexDirection: "row",
								justifyContent: "space-evenly"
							}}
						>
							<Button
								block
								success
								style={{ margin: 15 }}
								onPress={() => {
									this.CheckIn();
								}}
								disabled={this.state.check_in_disabled}
							>
								<Text
									style={{ color: "white" }}
									uppercase={false}
								>
									Check In
								</Text>
							</Button>
							<Button
								block
								danger
								onPress={() => {
									this.CheckOut();
								}}
								disabled={this.state.check_out_disabled}
								style={{ margin: 15 }}
							>
								<Text
									style={{ color: "white" }}
									uppercase={false}
								>
									Check Out
								</Text>
							</Button>
						</View>
					)}

					{!this.state.is_loading_activity && (
						<View style={{ width: "90%", flexDirection: "column" }}>
							<View
								style={{
									flexDirection: "row",
									paddingBottom: 20,
									justifyContent: "space-between"
								}}
							>
								<Text>Status: </Text>
									<Badge
										small
										warning={
											this.state.status === "Vacation"
										}
										danger={this.state.status === "Absent"}
										success={
											this.state.status === "Attended"
										}
									>
										<Text uppercase={false}>
											{this.state.status==""?"Not Yet":this.state.status}
										</Text>
									</Badge>
							</View>
							<View
								style={{
									flexDirection: "row",
									paddingBottom: 20,
									justifyContent: "space-between"
								}}
							>
								<Text>Check in:</Text>
								<Text>{this.state.check_in}</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									paddingBottom: 20,
									justifyContent: "space-between"
								}}
							>
								<Text>Check out:</Text>
								<Text>{this.state.check_out}</Text>
							</View>
						</View>
					)}

					{/*<Text>Location: {this.state.location}</Text> */}
					{/* <Activity loading={true}/> */}
					{/* <Spinner visible={true} /> */}
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		marginTop: 15,
		// marginBottom:30,
		// paddingRight: 30,
		// paddingLeft: 30,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default HomeScreen;
