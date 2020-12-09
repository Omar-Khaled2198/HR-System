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
  Tabs,
} from "native-base";
import ServiceProvider from "../../utils/service_provider.utils";
import Events from "../../utils/events.util";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationEvents } from "react-navigation";
class TasksScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      tasksToDo: [],
      tasksDone: [],
      is_loading: true,
      is_request_loading: false,
    };
  }

  async componentDidMount() {
    await this.GetTasks();
  }

  async GetTasks() {
    const response = await ServiceProvider.GET(
      `tasks?assigned_to=${global.account._id}`
    );
    let tasksToDo = [];
    let tasksDone = [];
    if (response.status === 200) {
      response.data.map((task) => {
        if (task.status === "Active") {
          tasksToDo.push(task);
        } else if (task.status === "Done") {
          tasksDone.push(task);
        }
      });
      this.setState({ tasksToDo, tasksDone, is_loading: false });
    }
  }

  async ChangeTaskStatus(id) {
    this.setState({ is_request_loading: true });
    const response = await ServiceProvider.PUT(`tasks/${id}`, {
      status: "Done",
    });
    if (response.status === 200) {
      Events({
        msg: "marked a task as done.",
        id: response.data._id,
        resource: "tasks",
      });
      let tasksToDo = this.state.tasksToDo.filter((item) => item._id !== id);
      let tasksDone = [...this.state.tasksDone, response.data];
      this.setState({ tasksToDo, tasksDone, is_request_loading: false });
      Alert.alert("Success", "Task status changed successfully");
    }
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            >
              <Ionicons name="md-menu" size={25} color={"white"} />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ alignSelf: "center" }}>Tasks</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <NavigationEvents onDidFocus={() => this.GetTasks()} />
        <Tabs locked>
          <Tab heading="To Do">
            <Spinner visible={this.state.is_request_loading} color={"blue"} />
            <Spinner
              visible={this.state.is_loading}
              color={"blue"}
              overlayColor={"transparent"}
            />
            {!this.state.loading && (
              <SwipeListView
                data={this.state.tasksToDo}
                keyExtractor={(item) => item._id}
                renderItem={(data) => (
                  <Card>
                    <CardItem>
                      <Body>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          {data.item.title}
                        </Text>
                        <Text>{data.item.description}</Text>
                        <Text style={{ color: "green" }}>
                          Deadline:{" "}
                          {moment(data.item.deadline).format(
                            "YYYY/MM/DD h:mm a"
                          )}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                )}
                renderHiddenItem={(data) => (
                  <Card style={styles.backRightBtn}>
                    <Button
                      onPress={() =>
                        this.ChangeTaskStatus.bind(this)(data.item._id)
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        alignSelf: "center",
                      }}
                      success
                    >
                      <Text>DONE</Text>
                    </Button>
                  </Card>
                )}
                rightOpenValue={-75}
              />
            )}
          </Tab>
          <Tab heading="Done">
            <Spinner
              visible={this.state.is_loading}
              color={"blue"}
              overlayColor={"transparent"}
            />
            {!this.state.is_loading && (
              <FlatList
                data={this.state.tasksDone}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                  <Card>
                    <CardItem>
                      <Body>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          {item.title}
                        </Text>
                        <Text>{item.description}</Text>
                        <Text style={{ color: "green" }}>
                          Deadline:{" "}
                          {moment(item.deadline).format("YYYY/MM/DD h:mm a")}
                        </Text>
                        <Text style={{ color: "green" }}>
                          Done: {moment(item.done).format("YYYY/MM/DD h:mm a")}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                )}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: "white",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 75,
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
  },

  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    height: "90%",
    width: 75,
    right: 0,
    top: 0,
    backgroundColor: "green",
  },
});
export default TasksScreen;
