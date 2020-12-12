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
} from "native-base";
import moment from "moment";
import ServiceProvider from "../utils/service_provider.utils";

class AttandanceComponent extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      month: moment().format("MM"),
      year: moment().format("YYYY"),
      days: {},
      marked: {},
      is_loading: true,
    };
  }

  componentDidMount() {
    this.GetDays();
  }

  OnDayPress(date) {
    const record = this.state.days[
      `${date.year}-${("0" + date.month).slice(-2)}-${("0" + date.day).slice(
        -2
      )}`
    ];
    console.log(("0" + date.day).slice(-2));
    if (record) {
      Alert.alert(
        `Day: ${date.year}-${("0" + date.month).slice(-2)}-${(
          "0" + date.day
        ).slice(-2)}`,
        `Status: ${record.status}\nCheck in : ${record.check_in}\nCheck out: ${
          record.check_out
        }`
      );
    }
  }

  async GetDays() {
    const response = await ServiceProvider.GET(
      `attendance?employee=${global.account._id}
            &month=${this.state.month}&year=${this.state.year}`
    );

    if (response.status == 200) {
      var marked = {};
      var days = {};
      response.data.map((record) => {
        days[`${record.year}-${record.month}-${record.day}`] = {
          status: record.status,
          check_in: record.check_in,
          check_out: record.check_out,
        };
        marked[`${record.year}-${record.month}-${record.day}`] =
          record.status == "Attended"
            ? {
                disabled: true,
                startingDay: true,
                color: "green",
                endingDay: true,
              }
            : record.status == "Vacation"
            ? {
                disabled: true,
                startingDay: true,
                color: "orange",
                endingDay: true,
              }
            : {
                disabled: true,
                startingDay: true,
                color: "red",
                endingDay: true,
              };
      });
      this.setState({ days, marked, is_loading: false });
    }
  }

  OnChangeMonth(date) {
    this.setState({ month: date.month, year: date.year });
  }

  render() {
    return (
      <Container>
        <Content>
          {!this.state.is_loading && (
            <Calendar
              onMonthChange={(date) => {
                this.OnChangeMonth(date);
              }}
              markingType={"period"}
              onDayPress={(date) => {
                this.OnDayPress(date);
              }}
              markedDates={this.state.marked}
              style={{ marginTop: 10, height: "100%" }}
            />
          )}
        </Content>
      </Container>
    );
  }
}

export default AttandanceComponent;
