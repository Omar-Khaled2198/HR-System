import React, { Component } from 'react'
import { Container, Header, Content,Title,Button, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
class SettingsScreen extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{flex:1}}>
                        <Title style={{ alignSelf: "center" }}>Settings</Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Content>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="at" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Account</Text>
                    </Body>
                    <Right/>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="person" />
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
