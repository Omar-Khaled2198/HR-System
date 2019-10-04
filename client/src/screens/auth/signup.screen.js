import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Container, Button, Content, Form, Item, Input, Label} from 'native-base';
import {SetAccountGlobal} from '../../utils/global.util';
import ServiceProvider from '../../utils/service_provider.utils';

class SignUpScreen extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }


    async SignUp() {

        if (this.state.email === "" || this.state.password === "") {
            this.setState({error: "Email and password can't be empty!"})
        } else {
            const response = await ServiceProvider.POST("sign_up",{
                email: this.state.email, 
                password: this.state.password
            });
            if (response.status !== 200) {
                this.setState({error: response.data.msg});
            } else {
                SetAccountGlobal(response.data);
                this.props.navigation.navigate('ProfileCreation')
            }
        }

    }

    render() {
        return (

            <Container style={styles.content}>
                <Content>
                    <Text style={styles.title}>HR System</Text>
                    <Form style={styles.form}>
                        <Item>
                            <Label>Email</Label>
                            <Input textContentType={"emailAddress"}
                                   value={this.state.email}
                                   onChangeText={(email) => {
                                       this.setState({email})
                                   }}/>
                        </Item>
                        <Item>
                            <Label>Password</Label>
                            <Input textContentType={"password"}
                                   value={this.state.password}
                                   onChangeText={(password) => {
                                       this.setState({password})
                                   }}
                                   secureTextEntry={true}/>
                        </Item>
                        {this.state.error !== "" && <Text style={styles.error}>{this.state.error}</Text>}
                        <Button style={styles.signup_button} block primary onPress={() => this.SignUp()}>
                            <Text style={styles.signup_text}>Sign Up</Text>
                        </Button>
                        <Text style={styles.login_ref} onPress={() => this.props.navigation.navigate('Login')}>Have an
                            account?
                            <Text style={{textDecorationLine: "underline"}}> Login</Text>
                        </Text>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        alignSelf: "center",
        marginTop: 80
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    form: {
        marginTop: 30,
        paddingRight: 35,
        paddingLeft: 35,
    },
    signup_button: {
        marginTop: 35,
        marginLeft: 15
    },
    signup_text: {
        color: "white"
    },
    login_ref: {
        alignSelf: "center",
        marginTop: 20,
        marginLeft: 15,
    },
    error: {
        marginTop: 20,
        color: "red",
        marginLeft: 15
    }
})
export default SignUpScreen;
