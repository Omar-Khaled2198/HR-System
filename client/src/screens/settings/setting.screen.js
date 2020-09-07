import React, {Component} from 'react'
import {Container, Header, Content, Title, Button, ListItem, Text, Icon, Left, Body, Right} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
class SettingsScreen extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='md-arrow-back'size={20} color={"white"}/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        <Title style={{alignSelf: "center"}}>Settings</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>
                <Content>
                    <ListItem icon>
                        <Left>
                            <Button style={{backgroundColor: "#007AFF"}}>
                                <Ionicons name='ios-information-circle'size={25} color={"white"}/>
                            </Button>
                        </Left>
                        <Body>
                            <Text>Account</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{backgroundColor: "#007AFF"}}>
                                <Ionicons name='ios-person'size={25} color={"white"}/>
                            </Button>
                        </Left>
                        <Body>
                            <Text>Profile</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

export default SettingsScreen;
