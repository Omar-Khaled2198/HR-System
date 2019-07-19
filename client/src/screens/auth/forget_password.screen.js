import React, { Component } from 'react'
import {  StyleSheet } from 'react-native'
import { Container,Header,Left,Body,Right,Title,Icon,Text, Button, Content, Form, Item, Input, Label } from 'native-base';

class ForgetPasswordScreen extends Component {
    
    static navigationOptions = { header: null };
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
                        <Title style={{ alignSelf: "center" }}>Reset Password</Title>
                    </Body>
                    <Right style={{flex:1}}/>
                </Header>
                <Content>
                <Text style={styles.title}>Forget your password?</Text>
                <Text style={styles.msg}>It's often forgotten that password thing. Enter your email address and click "Reset Password" button and we will send email with code shortly.</Text>
                <Form style={styles.form}>
                    <Item>
                        <Label>Email</Label>
                        <Input />
                    </Item>
                    <Button style={styles.reset_button} block primary>
                        <Text style={styles.reset_text} uppercase={false} onPress={() => this.props.navigation.navigate('Home')}>Reset Password</Text>
                    </Button>
                </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        alignSelf:"center",
        marginTop: 90,
        fontWeight:"bold"
    },
    content:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    msg:{
        paddingRight: 35,
        paddingLeft: 35,
        marginTop: 10,
        marginLeft:15
    },
    form:{
        marginTop:10,
        paddingRight: 35,
        paddingLeft: 35,
    },
    reset_button:{
        marginTop:35,
        marginLeft:15
    },
    reset_text:{
        color:"white"
    },
    forget_password:{
        alignSelf: "center",
        marginTop:20,
        marginLeft:15,     
        textDecorationLine: 'underline'
    }
})
export default ForgetPasswordScreen;
