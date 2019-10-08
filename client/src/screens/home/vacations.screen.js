import React, { Component } from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
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
	Text
} from "native-base";
import VacationComponent from "../../components/vacation.com";
import ServiceProvider from "../../utils/service_provider.utils";
import Activity from "../../components/acitivity.com";
import Events from "../../utils/events.util";

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
		const response = await ServiceProvider.GET(`vacations?requester=${global.account._id}`);
		if (response.status === 200) {
			this.setState({ vacations: response.data, loading: false });
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
						const response = await ServiceProvider.PUT(`vacations/${vacation_id}`,{status:"Aborted"});
						if(response.status == 200){
							Events({msg:"aborted a vacation.",id:response.data._id,resource:"vacations"});
							Alert.alert("Abort Vacation", "Request aborted successfully");
						} else {
							Alert.alert("Abort Vacation", "Something went wrong.");
						}
						
					}
				}
			],
			{ cancelable: false }
		);
	};

	render() {
		return (
			<Container>
				<Header>
					<Left style={{ flex: 1 }} />
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
					<Activity loading={this.state.loading}/>
					{!this.state.loading && (
						<FlatList
							data={this.state.vacations}
							keyExtractor={(item, index) => item._id}
							renderItem={({ item }) => (
								<VacationComponent
									data={item}
									abort={this.AbortVacation}
								/>
							)}
						/>
					)}
				</Content>
			</Container>
		);
	}
}

export default VacationScreen;
