import React, {Component} from 'react'
import {Text, View, StyleSheet, Alert} from 'react-native'
import {
    Container,
    Button,
    Content,
    Header,
    Textarea,
    Title,
    Right,
    Icon,
    Left,
    Body,
    Form,
    Item,
    Input,
    Label
} from 'native-base';
import {Avatar} from 'react-native-elements';
import ProfileService from '../../services/profile.service';
import { Store } from '../../utils/storage.utils';
import { SetAccountGlobal } from '../../utils/global.util';

class ProfileCreationScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            first_name: "Omar",
            last_name: "Khaled",
            job_title: "Backend Developer",
            profile_picture:"",
            error: "",
            loading: true
        };
    }

    async UploadProfilePicture(){
        const profile_picture = await ProfileService.UploadProfilePicture();
        this.setState({profile_picture});
    }

    async CreateProfile(){

        const response = await ProfileService.CreateProfile(
            this.state.first_name,
            this.state.last_name,
            this.state.job_title,
            this.state.profile_picture
        );
        if (response.status !== 200) {
            this.setState({error: response.data.msg});
        } else {
            var account = global.account;
            account.profile = response.data.profile;
            SetAccountGlobal(account);
            await Store("account",account)
            Alert.alert(
                "Success",
                response.data.msg,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            this.props.navigation.navigate('Home')
                        }
                    }
                ],
            );
            //this.props.navigation.navigate('Home')
        }
        
    }

    render() {
        return (
            <Container style={styles.content}>
                <Header>
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        <Title style={{alignSelf: "center"}}>Create Profile</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>
                <Content>
                    <Form style={styles.form}>
                        <Avatar
                            rounded
                            size={130}
                            source={require("../../assets/images/default_avatar.png")}
                            showEditButton
                            onEditPress={()=>{this.UploadProfilePicture()}}
                        />
                        <Item style={{marginTop: 30}}>
                            <Label>First Name</Label>
                            <Input textContentType={"name"}
                                   value={this.state.first_name}
                                   onChangeText={(first_name) => {
                                       this.setState({first_name})
                                   }}/>
                        </Item>
                        <Item>
                            <Label>Last Name</Label>
                            <Input textContentType={"name"}
                                   value={this.state.last_name}
                                   onChangeText={(last_name) => {
                                       this.setState({last_name})
                                   }}/>
                        </Item>
                        <Item>
                            <Label>Job Title</Label>
                            <Input textContentType={"name"}
                                   value={this.state.job_title}
                                   onChangeText={(job_title) => {
                                       this.setState({job_title})
                                   }}/>
                        </Item>
                        <Button style={styles.create_button} block primary onPress={() => this.CreateProfile()}>
                            <Text style={styles.create_text}>Create</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    form: {
        marginTop: 30,
        paddingRight: 35,
        paddingLeft: 35,
        alignItems: "center"
    },

    create_button: {
        marginTop: 35,
        marginLeft: 15
    },
    create_text: {
        color: "white"
    },

})

export default ProfileCreationScreen;
