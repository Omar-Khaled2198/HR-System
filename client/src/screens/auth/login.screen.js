import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';
import { LoginService } from '../../services/account.service';
import { SetToken } from '../../utils/global.util';



class LoginScreen extends Component {
    
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = { 
            email:"omar21621@gmail.com",
            password:"12345678910",
            error:""
         };
      }


    componentDidMount(){
            
    }

    async login(){

        const response = await LoginService(this.state.email,this.state.password);
        if(response.status!=200){
            this.setState({error:response.data.msg});
        } else {
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        return (

            <Container style={styles.content}>
                <Content>
                <Text style={styles.title}>HR System</Text>
                <Form style={styles.form}>
                    <Item >
                        <Label>Email</Label>
                        <Input textContentType={"emailAddress"} 
                               value={this.state.email} 
                               onChangeText={(email)=>{this.setState({email})}}/>
                    </Item>
                    <Item >
                        <Label>Password</Label>
                        <Input textContentType={"password"}
                               value={this.state.password} 
                               onChangeText={(password)=>{this.setState({password})}} 
                               secureTextEntry={true}/>
                    </Item>
                    {this.state.error!=""&&<Text style={styles.error}>{this.state.error}</Text>}
                    <Button style={styles.login_button} block primary onPress={() => this.login()}>
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
        marginTop:30,
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
    },
    error:{
        marginTop:20,
        color:"red",
        marginLeft:15
    }
})
export default LoginScreen;
