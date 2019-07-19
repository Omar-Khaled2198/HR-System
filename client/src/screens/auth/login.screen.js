import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';
class LoginScreen extends Component {
    
    static navigationOptions = { header: null };
    render() {
        return (

            <Container style={styles.content}>
                <Content>
                <Text style={styles.title}>HR System</Text>
                <Form style={styles.form}>
                    <Item >
                        <Label>Email</Label>
                        <Input />
                    </Item>
                    <Item >
                        <Label>Password</Label>
                        <Input />
                    </Item>
                    <Button style={styles.login_button} block primary onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.login_text} >Login</Text>
                    </Button>
                    <Text style={styles.forget_password} onPress={() => this.props.navigation.navigate('ForgetPassword')}>Forget your password?</Text>
                    <Text style={styles.signup_ref} onPress={() => this.props.navigation.navigate('SignUp')} >Don't have account?
                        <Text style={{textDecorationLine:"underline"}}> Sign Up</Text>
                    </Text>
                </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:50,
        alignSelf:"center",
        marginTop: 80
    },
    content:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    form:{
        marginTop:30,
        paddingRight: 35,
        paddingLeft: 35,
    },
    login_button:{
        marginTop:35,
        marginLeft:15
    },
    login_text:{
        color:"white"
    },
    signup_ref:{
        alignSelf: "center",
        marginTop:20,
        marginLeft:15,        
    },
    forget_password:{
        alignSelf: "center",
        marginTop:20,
        marginLeft:15,     
        textDecorationLine: 'underline'
    }
})
export default LoginScreen;
