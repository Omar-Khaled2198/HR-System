import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Button, Content,Header,Textarea, Title,Right, Icon, Left, Body, Form, Item, Input, Label } from 'native-base';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { UploadProfilePictureService } from '../../services/profile.service';

class ProfileCreationScreen extends Component {

    static navigationOptions = { 
        header: null,
    };

    // async uploadProfilePicture(){
        
    //     var options = {
    //         title: 'Select Image',
    //         storageOptions: {
    //          skipBackup: true,
    //          path: 'images'
    //         }
    //      };

    //     ImagePicker.showImagePicker(options, (response) => {

    //         console.log('User selected a file form camera or gallery', response); 
    //         const data = new FormData();
    //         data.append('name', 'avatar');
    //         data.append('fileData', {
    //             uri : response.uri,
    //             type: response.type,
    //             name: response.fileName
    //            });
    //         const res = UploadProfilePictureService(data);
    //         console.log("fuck",res)
         
          
          
    //     })
         
    // }
    
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
                        <Title style={{ alignSelf: "center" }}>Create Profile</Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Content>
                <Form style={styles.form}>
                    <Avatar
                        rounded
                        size={130}
                        source={require("../../assets/images/default_avatar.png")}
                        showEditButton
                        // onEditPress={()=>{this.uploadProfilePicture()}}
                        />
                        <Item style={{marginTop:30}}>
                            <Label>First Name</Label>
                            <Input />
                        </Item>
                        <Item>
                            <Label>Last Name</Label>
                            <Input />
                        </Item>
                        <Item>
                            <Label>Job Title</Label>
                            <Input />
                        </Item>
                    <Button style={styles.create_button} block primary>
                        <Text style={styles.create_text} onPress={() => this.props.navigation.navigate('Home')}>Create</Text>
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
        paddingRight: 35,
        paddingLeft: 35,
        alignItems:"center"
    },

    create_button:{
        marginTop:35,
        marginLeft:15
    },
    create_text:{
        color:"white"
    },

})

export default ProfileCreationScreen;
