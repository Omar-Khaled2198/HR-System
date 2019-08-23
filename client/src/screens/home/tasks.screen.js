import React, { Component } from "react";
import { StyleSheet, FlatList, View } from "react-native";
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
	Tab,
	Tabs
} from "native-base";
import TaskToDoComponent from "../../components/task_todo.com";
import TaskDoneComponent from "../../components/task_done.com";
import { GetTasksService } from "../../services/task.service";
class TasksScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
			tasksToDo: [],
			tasksDone: [],
			loading: true
		};
	}
	async componentDidMount() {
		await this.getTasks();
	}

	getTasks = async () => {
		const response = await GetTasksService();
		let tasksToDo = [];
		let tasksDone = [];
		if (response.status === 200) {
			response.data.map(task => {
				if (task.status === "To Do") {
					tasksToDo.push(task);
				} else {
					tasksDone.push(task);
				}
			});
			this.setState({ tasksToDo, tasksDone, loading: false });
		}
	};

	render() {
		return (
			<Container>
				<Header hasTabs>
					<Left style={{ flex: 1 }} />
					<Body style={{ flex: 1 }}>
						<Title style={{ alignSelf: "center" }}>Tasks</Title>
					</Body>
					<Right style={{ flex: 1 }} />
				</Header>
				<Tabs locked>
					<Tab heading="To Do">
						{!this.state.loading && (
							<FlatList
								data={this.state.tasksToDo}
								keyExtractor={(item, index) => item._id}
								renderItem={({ item }) => (
									<TaskToDoComponent data={item} />
								)}
							/>
						)}
					</Tab>
					<Tab heading="Done">
						{!this.state.loading && (
							<FlatList
								data={this.state.tasksDone}
								keyExtractor={(item, index) => item._id}
								renderItem={({ item }) => (
									<TaskDoneComponent data={item} />
								)}
							/>
						)}
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default TasksScreen;
