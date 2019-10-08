import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Container, Header, Title, Right, Content, Button, Icon, Left, Body, Text} from "native-base";
import {GetProfileService} from '../../services/profile.service';
import moment from 'moment';
import {UploadProfilePictureService} from '../../services/profile.service';
import Activity from '../../components/acitivity.com';
import Spinner from 'react-native-loading-spinner-overlay';
import FirebaseHandler from '../../utils/firebase_handler.util';
import Events from '../../utils/events.util';

class HomeScreen extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        
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
                    <Text>Hi, {global.account.profile.first_name}</Text>
                    {/* <Activity loading={true}/> */}
                    {/* <Spinner visible={true} /> */}
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;
