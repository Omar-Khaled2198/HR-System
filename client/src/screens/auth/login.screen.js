import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';
import { LoginService } from '../../services/account.service';
import { SetTokenGlobal, SetProfileGlobal } from '../../utils/global.util';
import { Store, Fetch} from "../../utils/storage.utils"
import { GetProfileService } from '../../services/profile.service';


class LoginScreen extends Component {
    
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = { 
            email:"omar21621@gmail.com",
            password:"12345678910",
            error:"",
            loading:true
         };
      }


    async componentDidMount() {

        const account = await Fetch("account");
        if (account != null && account.token) {

            SetTokenGlobal(account.token);
            const profile = await Fetch("profile");

            if (profile != null) {

                SetProfileGlobal(profile._id);
                this.props.navigation.navigate('Home')
                
            } else {

                this.setState({loading:false})
            }
        }        
    }

    async login() {

        if (this.state.email == "" || this.state.password == "") {

            this.setState({
                error: "Email and password can't be empty!"
            })

        } else {

            var response = await LoginService(this.state.email, this.state.password);

            if (response.status != 200) {

                this.setState({
                    error: response.data.msg
                });

            } else {

                SetTokenGlobal(response.data.token);

                var account = {
                    "email": this.state.email,
                    "password": this.state.password,
                    "token": response.data.token
                }

                await Store("account",account);
                response = await GetProfileService();

                if (response.status != 200) {
                    
                    this.props.navigation.navigate('ProfileCreation');

                } else {
                    
                    SetProfileGlobal(response.data._id)
                    await Store("profile",response.data);
                    this.props.navigation.navigate('Home');
                }
            }
        }

    }

    render() {
        return (

            <Container style={styles.content}>
                {!this.state.loading&&
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
                </Content>}
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
