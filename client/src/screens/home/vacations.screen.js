import React, { Component } from "react";
import { StyleSheet, FlatList, View, Alert } from "react-native";
import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	Left,
	Right,
	Card,
	CardItem,
	Body,
	Text,
	Badge,
	List,
	ListItem
} from "native-base";
import VacationComponent from "../../components/vacation.com";
import ServiceProvider from "../../utils/service_provider.utils";
import Activity from "../../components/acitivity.com";
import Events from "../../utils/events.util";
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
class VacationScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
			vacations: [],
			loading: true
		};
	}

	async componentDidMount() {
		await this.GetVacations();
	}

	GetVacations = async () => {
		const response = await ServiceProvider.GET(
			`vacations?requester=${global.account._id}`
		);
		if (response.status === 200) {
			this.setState({
				vacations: response.data.reverse(),
				loading: false
			});
		}
	};

	AbortVacation = async vacation_id => {
		Alert.alert(
			"Abort Vacation",
			"Are you sure?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{
					text: "OK",
					onPress: async () => {
						const response = await ServiceProvider.PUT(
							`vacations/${vacation_id}`,
							{ status: "Aborted" }
						);
						if (response.status == 200) {
							Events({
								msg: "aborted a vacation.",
								id: response.data._id,
								resource: "vacations"
							});
							Alert.alert(
								"Abort Vacation",
								"Request aborted successfully"
							);
						} else {
							Alert.alert(
								"Abort Vacation",
								"Something went wrong."
							);
						}
					}
				}
			],
			{ cancelable: false }
		);
	};

	render() {
		var current_month = "";
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
							<Ionicons name='md-menu' size={25} color={"white"}/>
						</Button>
					</Left>
					<Body style={{ flex: 1 }}>
						<Title style={{ alignSelf: "center" }}>Vacations</Title>
					</Body>
					<Right style={{ flex: 1 }}>
						<Button
							hasText
							transparent
							onPress={() =>
								this.props.navigation.navigate("NewVacation")
							}
						>
							<Text uppercase={false}>New</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<Activity loading={this.state.loading} />
					{!this.state.loading && (
						<List>
							{this.state.vacations.map((vacation, index) => {
								const created_at = moment
									.unix(vacation.created_at)
									.format("M");
								var items = [];
								if (created_at != current_month) {
									current_month = created_at;
									items.push(
										<ListItem
											itemDivider
											key={vacation.created_at}
										>
											<Text
												style={{ fontWeight: "bold" }}
											>
												{moment
													.unix(vacation.created_at)
													.format("MMM, YYYY")}
											</Text>
										</ListItem>
									);
								}
								items.push(
									<ListItem
										key={vacation._id}
										onPress={() => {
											this.props.navigation.navigate(
												"Vacation",
												{
													vacation,
													AbortVacation: (this.AbortVacation)
												}
											);
										}}
										AbortVacation={this.AbortVacation}
										
									>
										<Left style={{flex:0.7}}>
											<Text>{vacation.title}</Text>
										</Left>
										<Right style={{flex:0.3}}>
											<Badge
												small
												warning={
													vacation.status ===
													"Pending"
												}
												danger={
													vacation.status ===
													"Rejected"
												}
												success={
													vacation.status ===
													"Accepted"
												}
												style={vacation.status==="Aborted"?{backgroundColor: 'black' }:{}}
											>
												<Text uppercase={false}>
													{vacation.status}
												</Text>
											</Badge>
										</Right>
									</ListItem>
								);
								return items;
							})}
						</List>
					)}
				</Content>
			</Container>
		);
	}
}

export default VacationScreen;
