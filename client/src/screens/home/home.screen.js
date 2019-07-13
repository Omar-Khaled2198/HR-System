import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Title,Right, Content, Button, Icon, Left, Body, Text } from "native-base";

class HomeScreen extends Component {

    static navigationOptions = { header: null };
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;
