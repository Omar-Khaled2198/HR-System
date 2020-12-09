import React, { Component } from "react";
import { StyleSheet, View, Alert, PermissionsAndroid } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
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
  CardItem,
  List
} from "native-base";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirebaseHandler from "../../utils/firebase_handler.util";
class NotificationsScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
		notifications:{},
		is_loading_notifications: true,
    };
  }

  async componentDidMount() {
	let notifications = [];
    const snapshots = await FirebaseHandler.ReadOnce(
      `notifications/${global.account._id}`
    );
    await snapshots.forEach((childNodes) => {
      notifications.push({...childNodes.val(),key:childNodes.key});
    });

    this.setState({
      notifications: notifications.reverse(),
      is_loading_notifications: false,
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
              <Ionicons name="md-menu" size={25} color={"white"} />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ alignSelf: "center" }}>Notifications</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <Spinner visible={this.state.is_loading_notifications} color={"blue"} overlayColor={"transparent"}/>
           {!this.state.is_loading_notifications && (
            <List>
              {this.state.notifications.map((notification) => {
                return (
                  <Card key={notification.key}>
                    <CardItem>
                      <Body>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          {notification.title}
                        </Text>
                        <Text>{notification.body}</Text>
                        <Text style={{ color: "green" }}>
                          {moment.unix(notification.at).format("YYYY/MM/DD h:mm a")}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                );
              })}
            </List>
          )}
        </Content>
      </Container>
    );
  }
}

export default NotificationsScreen;
