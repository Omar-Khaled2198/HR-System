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
	Tab,
	Tabs
} from "native-base";
import TaskToDoComponent from "../../components/task_todo.com";
import TaskDoneComponent from "../../components/task_done.com";
import ServiceProvider from "../../utils/service_provider.utils";
import Activity from "../../components/acitivity.com";
import Events from "../../utils/events.util";
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
		await this.GetTasks();
	}

	async GetTasks(){
		const response = await ServiceProvider.GET(`tasks?assigned_to=${global.account._id}`);
		let tasksToDo = [];
		let tasksDone = [];
		if (response.status === 200) {
			response.data.map(task => {
				if (task.status === "Active") {
					tasksToDo.push(task);
				} else if(task.status === "Done") {
					tasksDone.push(task);
				}
			});
			this.setState({ tasksToDo, tasksDone, loading: false });
			
		}
	};

	async ChangeTaskStatus(id,index){
		const response = await ServiceProvider.PUT(`tasks/${id}`,{status:"Done"});
		if(response.status === 200){
			Events("marked a task as done.");
			let tasksToDo = this.state.tasksToDo.filter(item => item._id !== id)
			console.log(2);
			let tasksDone = [...this.state.tasksDone,response.data]	
			console.log(3);
			this.setState({tasksToDo,tasksDone})
			Alert.alert(
                "Success",
                "Task status changed successfully"
            );
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
					<Activity  loading={this.state.loading}/>
						{!this.state.loading && (
							<FlatList
								data={this.state.tasksToDo}
								keyExtractor={(item, index) => item._id}
								renderItem={({ item,index }) => (
									<TaskToDoComponent data={item} done={this.ChangeTaskStatus.bind(this)} index={index}/>
								)}
							/>
						)}
					</Tab>
					<Tab heading="Done">
					<Activity  loading={this.state.loading}/>
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
