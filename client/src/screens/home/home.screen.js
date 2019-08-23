import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Container, Header, Title, Right, Content, Button, Icon, Left, Body, Text} from "native-base";
import {GetProfileService} from '../../services/profile.service';

import {UploadProfilePictureService} from '../../services/profile.service';
import Activity from '../../components/acitivity.com';
import Spinner from 'react-native-loading-spinner-overlay';
class HomeScreen extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => {
                            this.props.navigation.openDrawer();
                        }}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        <Title style={{alignSelf: "center"}}>Home</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>
                <Content>
                    {/* <Activity loading={true}/> */}
                    {/* <Spinner visible={true} /> */}
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;
