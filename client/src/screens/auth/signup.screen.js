import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';

class SignUpScreen extends Component {

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
                    <Button style={styles.signup_button} block primary>
                        <Text style={styles.signup_text} onPress={() => this.props.navigation.navigate('ProfileCreation')}>Sign Up</Text>
                    </Button>
                    <Text style={styles.login_ref} onPress={() => this.props.navigation.navigate('Login')}>Have an account?
                        <Text style={{textDecorationLine:"underline"}}> Login</Text>
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
    signup_button:{
        marginTop:35,
        marginLeft:15
    },
    signup_text:{
        color:"white"
    },
    login_ref:{
        alignSelf: "center",
        marginTop:20,
        marginLeft:15,        
    },
})
export default SignUpScreen;
