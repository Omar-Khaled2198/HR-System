import React, { Component } from "react";
import { StyleSheet, View, Alert, PermissionsAndroid } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

class AttandanceScreen extends Component {
	static navigationOptions = { header: null };

	constructor(props) {
		super(props);
		this.state = {
            month: moment().format("M"),
            year: moment().format("Y"),
            days: {},
            marked:{}
        };
    }

    componentDidMount(){
        this.GetDays();
    }

    OnDayPress(date){
        const record = this.state.days[`${date.year}-${date.month}-${date.day}`];
        if(record){
            Alert.alert(`Day: ${date.year}-${date.month}-${date.day}`,
            `Status: ${record.status}\nCheck in : ${record.check_in}\nCheck out: ${record.check_out}`
            );
        }
        
    } 

    async GetDays(){
        const response = await ServiceProvider.GET(
            `attendance?employee=${global.account._id}
            &month=${this.state.month}&year=${this.state.year}`
        );
        
        if(response.status == 200){
            var marked={}
            var days={}
            response.data.map((record)=>{
                days[`${record.year}-${record.month}-${record.day}`] = {
                    status: record.status,
                    check_in: record.check_in,
                    check_out: record.check_out
                    
				};
                marked[`${record.year}-${record.month}-${record.day}`] =
					record.status == "Attended"
						? {
								customStyles: {
									container: {
										backgroundColor: "green"
									},
									text: {
										color: "white"
									}
								}
						  }
						: record.status == "Vacation"
						? {
								customStyles: {
									container: {
										backgroundColor: "yellow"
									},
									text: {
										color: "white"
									}
								}
						  }
						: {
								customStyles: {
									container: {
										backgroundColor: "red"
									},
									text: {
										color: "white"
									}
								}
						  };
            })
            this.setState({days,marked});
        }
    }
    
    OnChangeMonth(date){
        this.setState({ month: date.month, year: date.year });
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
										<Ionicons name='md-menu' size={25} color={"white"}/>
									</Button>
								</Left>
								<Body style={{ flex: 1 }}>
									<Title style={{ alignSelf: "center" }}>
										Attandance
									</Title>
								</Body>
								<Right style={{ flex: 1 }} />
							</Header>
							<Content>
                                
                                <Calendar 
                                onMonthChange={(date) => {this.OnChangeMonth(date)}}
                                markingType={'custom'}
                                onDayPress={(date) => {this.OnDayPress(date)}}
                                markedDates={this.state.marked}
                                style={{marginTop:10,height:"100%"}} />
							</Content>
						</Container>
					);
				}
}


export default AttandanceScreen;
