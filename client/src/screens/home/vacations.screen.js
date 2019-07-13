import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left,Right,Card, CardItem, Body, Text } from "native-base";
import VacationComponent from "../../components/vacation.com"
class VacationScreen extends Component {
    static navigationOptions = { header: null };
    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex:1}}/>
                    <Body style={{flex:1}}>
                        <Title style={{ alignSelf: "center" }}>Vacations</Title>
                    </Body>
                    <Right style={{flex:1}}>
                        <Button hasText transparent onPress={() => this.props.navigation.navigate('NewVacation')}>
                            <Text uppercase={false}>New</Text>
                        </Button>
                    </Right >
                </Header>
                <Content>
                    <VacationComponent/>
                </Content>
            </Container>
        )
    }
}


export default VacationScreen
