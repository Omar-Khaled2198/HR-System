import React, { Component } from 'react'
import { Text, Alert, StyleSheet } from 'react-native'
import { Container, Button, Content,Header,Textarea, Title,Right, Icon, Left, Body, Form, Item, Input, Label } from 'native-base';
import DatePickerComponent from "../../components/datepicker.com"
import { RequestVacationService } from '../../services/vacation.service';


class VacationCreationScreen extends Component {

    static navigationOptions = { 
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = { 
            title:"",
            description:"",
            from:"",
            to:"",
         };
    }

    async request_vacation(){

        if (this.state.title != "" &&
            this.state.description != "" &&
            this.state.from != "" &&
            this.state.to != "") {

            const response = await RequestVacationService(this.state.title, this.state.description, this.state.from, this.state.to)
            Alert.alert(response.data.msg);

        }
    }

    render() {
        return (
            <Container style={styles.content}>
                <Header>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{flex:1}}>
                        <Title style={{ alignSelf: "center" }}>New Vacation</Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Content>
                <Form style={styles.form}>
                    <Item regular>
                        <Input placeholder="Title" 
                               value={this.state.title} 
                               onChangeText={(title)=>{this.setState({title})}}/>
                    </Item>
                    <Textarea  style={styles.desc_input} 
                               rowSpan={3} 
                               bordered 
                               placeholder="Description"
                               value={this.state.description} 
                               onChangeText={(description)=>{this.setState({description})}}
                                                                />
                    <DatePickerComponent placeholder="From"
                                         date={this.state.from}
                                         onChangeDate={(from)=>{this.setState({from})}}/>
                    <DatePickerComponent placeholder="To"
                                         date={this.state.to}
                                         onChangeDate={(to)=>{this.setState({to})}}/>
                    <Button style={styles.request_button} block primary onPress={() => this.request_vacation()}>
                        <Text style={styles.request_text}>Request</Text>
                    </Button>
                </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    form:{
        marginTop:30,
        paddingRight: 30,
        paddingLeft: 30,
    },
    desc_input:{
        marginTop:20,
    },
    request_button:{
        marginTop:35,
    },
    request_text:{
        color:"white"
    },

})

export default VacationCreationScreen;
