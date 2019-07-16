import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Title,Right,Spinner, Content, Button, Icon, Left, Body, Text } from "native-base";

class HomeScreen extends Component {

    static navigationOptions = { header: null };
    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.openDrawer();}}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body style={{flex:1}}>
                        <Title style={{ alignSelf: "center" }}>Home</Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Content>
 
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;
