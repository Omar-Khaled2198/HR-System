import React, { Component } from "react";
import { Text, Alert, StyleSheet,View } from "react-native";
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
} from "native-base";
import DatePickerComponent from "../../components/datepicker.com";
import Spinner from "react-native-loading-spinner-overlay";
import ServiceProvider from "../../utils/service_provider.utils";
import Events from "../../utils/events.util";
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';

class VacationCreationScreen extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			from: "",
            to: "",
            loading:false
		};
	}

	async RequestVacation() {
		if (
			this.state.title !== "" &&
			this.state.description !== "" &&
			this.state.from !== "" &&
			this.state.to !== ""
		) {
            this.setState({loading:true})
			const response = await ServiceProvider.POST("vacations",{
				title: this.state.title,
				description: this.state.description,
				from: this.state.from,
				to: this.state.to,
				requester: global.account._id
			});
			this.setState({loading:false})
			if(response.status == 200){
				Events({msg:"requested a vacation.",id:response.data._id,resource:"vacations"});
				Alert.alert("Request Vacation", "Vacation requested successfully.");
			}
			
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
							<Ionicons name='md-arrow-back'size={20} color={"white"}/>
						</Button>
					</Left>
					<Body style={{ flex: 1 }}>
						<Title style={{ alignSelf: "center" }}>
							New Vacation
						</Title>
					</Body>
					<Right style={{ flex: 1 }} />
				</Header>
				<Content>
					<View>
                        <Spinner visible={this.state.loading} color={"blue"}/>
                    </View>
					<Form style={styles.form}>
						<Item rounded style={styles.title_input}>
							<Input
								placeholder="Title"
								value={this.state.title}
								onChangeText={title => {
									this.setState({ title });
								}}
							/>
						</Item>
						<Item rounded style={styles.desc_input}>
						<Textarea
							
							rowSpan={3}
							placeholder="Description"
							value={this.state.description}
							onChangeText={description => {
								this.setState({ description });
							}}
						/>
						</Item>
						<DatePickerComponent
							placeholder="From"
							onChangeDate={from => {
								console.log("from",moment(from).format("YYYY/MM/DD"))
								this.setState({ from });
							}}
						/>
						<DatePickerComponent
							placeholder="To"
							onChangeDate={to => {
								console.log("to",moment(to).format("YYYY/MM/DD"))
								this.setState({ to });
							}}
						/>

						<Button
							style={styles.request_button}
							block
							rounded
							primary
							onPress={() => this.RequestVacation()}
						>
							<Text style={styles.request_text}>Request</Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		// flexDirection: "column",
		// justifyContent: "space-between",
		// alignContent: "space-between",
		//paddingBottom:20
	},
	form: {
		marginTop: 30,
		paddingRight: 20,
		paddingLeft: 20,
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignContent: "space-between",
	},
	title_input: {
		marginBottom: 20,
		paddingLeft:10
	},
	desc_input: {
		marginBottom: 20,
		paddingLeft:10
	},
	request_button: {
		marginTop: 35
	},
	request_text: {
		color: "white"
	}
});

export default VacationCreationScreen;
