import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Button, Content,Header,Textarea, Title,Right, Icon, Left, Body, Form, Item, Input, Label } from 'native-base';
import DatePickerComponent from "../../components/datepicker.com"
class NewVacationScreen extends Component {

    static navigationOptions = { 
        header: null,
    };
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
                        <Input placeholder="Title"/>
                    </Item>
                    <Textarea style={styles.desc_input} rowSpan={3} bordered placeholder="Description" />
                    <DatePickerComponent placeholder="From"/>
                    <DatePickerComponent placeholder="To"/>
                    <Button style={styles.request_button} block primary>
                        <Text style={styles.request_text} onPress={() => this.props.navigation.navigate('Home')}>Request</Text>
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

export default NewVacationScreen;
