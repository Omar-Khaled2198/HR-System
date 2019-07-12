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
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input />
                    </Item>
                    <Button style={styles.login_button} block primary>
                        <Text style={styles.login_text} onPress={() => this.props.navigation.navigate('Home')}>Login</Text>
                    </Button>
                    <Text style={styles.forget_password}>Forget your password?</Text>
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
        marginTop:10,
        paddingRight: 50,
        paddingLeft: 50,
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
