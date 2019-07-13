
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,createBottomTabNavigator,createDrawerNavigator} from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from "../screens/auth/login.screen";
import SignUpScreen from "../screens/auth/signup.screen";
import HomeScreen from "../screens/home/home.screen";
import VacationScreen from "../screens/home/vacations.screen";
import NewVacationScreen from "../screens/forms/new_vacation.screen";
import TasksScreen from "../screens/home/tasks.screen";
import ChatScreen from "../screens/home/chat.screen";
import ForgetPasswordScreen from "../screens/auth/forget_password"

const VacationsStack = createStackNavigator({
    Vacations: {
        screen: VacationScreen
    },
    NewVacation: {
        screen: NewVacationScreen
    }
},{
    animationEnabled: true,
    swipeEnabled:true,
})

VacationsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };

const HomeNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-home' size={25} color={tintColor} />)
        }
    },
    Vacations: {
        screen: VacationsStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-pause' size={25} color={tintColor} />)
        }
    },
    Tasks:{
        screen: TasksScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-code-working' size={25} color={tintColor} />)
        }
    },
    Chat:{
        screen: ChatScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-chatboxes' size={25} color={tintColor} />)
        }
    }

},{
    animationEnabled: true,
    swipeEnabled:true,
})


const AuthNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    SignUp:{
        screen: SignUpScreen
    },
    ForgetPassword:{
        screen: ForgetPasswordScreen
    }
},{
    animationEnabled: true,
    swipeEnabled:true,
});

const HomeDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:HomeNavigator,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-home' size={25} color={tintColor} />)
        }
    },
})

const AppNavigator = createStackNavigator({

    Auth: {
        screen: AuthNavigator
    },
    Home:{
        screen: HomeDrawerNavigator
    }

},{
    headerMode: 'none',
    animationEnabled: true,
    swipeEnabled:true,
})

export default createAppContainer(AppNavigator);