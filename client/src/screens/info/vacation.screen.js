import React, { Component } from "react";

import { StyleSheet } from "react-native";
import {
	Container,
	Button,
	Content,
	Header,
	Textarea,
	Title,
	Right,
	Text,
	Icon,
	Left,
	Body,
	Form,
	Item,
	Badge,
	Input,
	Label,
	Card,
	CardItem
} from "native-base";
import moment from "moment";

const VacationScreen = props => {
	const vacation = props.navigation.getParam("vacation");
	const AbortVacation = props.navigation.getParam("AbortVacation");
	return (
		<Container>
			<Header>
				<Left style={{ flex: 1 }}>
					<Button
						transparent
						onPress={() => props.navigation.goBack()}
					>
						<Icon name="arrow-back" />
					</Button>
				</Left>
				<Body style={{ flex: 1 }}>
					<Title style={{ alignSelf: "center" }}>
						{vacation.title}
					</Title>
				</Body>
				<Right style={{ flex: 1 }} />
			</Header>
			<Content style={{ flexDirection: "column", flex: 1 }}>
				<Card style={styles.card} transparent>
					<CardItem style={styles.card_item}>
						<Text style={{ fontWeight: "bold", fontSize: 18 }}>
							Description
						</Text>
						<Text>{vacation.description}</Text>
					</CardItem>
					<CardItem style={styles.card_item}>
						<Text style={{ fontWeight: "bold", fontSize: 18 }}>
							From
						</Text>
						<Text>
							{moment(vacation.from).format("YYYY/MM/DD h:mm a")}
						</Text>
					</CardItem>
					<CardItem style={styles.card_item}>
						<Text style={{ fontWeight: "bold", fontSize: 18 }}>
							To
						</Text>
						<Text>
							{moment(vacation.to).format("YYYY/MM/DD h:mm a")}
						</Text>
					</CardItem>
					<CardItem style={styles.card_item}>
						<Text style={{ fontWeight: "bold", fontSize: 18 }}>
							Status
						</Text>
						<Badge
							small
							warning={vacation.status === "Pending"}
							danger={vacation.status === "Rejected"}
							success={vacation.status === "Accepted"}
							style={
								vacation.status === "Aborted"
									? { backgroundColor: "black",marginTop:10 }
									: {marginTop:10}
							}
						>
							<Text uppercase={false}>{vacation.status}</Text>
						</Badge>
					</CardItem>
				</Card>
				{vacation.status === "Pending" && (
					<Button
						block
						danger
						style={{ margin: 15 }}
						onPress={() => {
							AbortVacation(vacation._id);
						}}
					>
						<Text style={{ color: "white" }}>Abort Request</Text>
					</Button>
				)}
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	card: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10
	},
	status_buttons: {
		marginTop: 10,
		alignSelf: "flex-start"
	},
	card_item: {
		flexDirection: "column",
		alignItems: "flex-start"
	}
});

export default VacationScreen;
