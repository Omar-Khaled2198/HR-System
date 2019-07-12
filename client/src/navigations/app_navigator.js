
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,createBottomTabNavigator} from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from "../screens/login.screen";
import SignUpScreen from "../screens/signup.screen";
import HomeScreen from "../screens/home.screen";
import VacationScreen from "../screens/vacations.screen";


const HomeNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-home' size={25} color={tintColor} />)
        }
    },
    Vacations: {
        screen: VacationScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-pause' size={25} color={tintColor} />)
        }
    }
})

const AuthNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    SignUp:{
        screen: SignUpScreen
    }
});

const AppNavigator = createStackNavigator({

    Auth: {
        screen: AuthNavigator
    },
    Home:{
        screen: HomeNavigator
    }

},{
    headerMode: 'none'
})

export default createAppContainer(AppNavigator);