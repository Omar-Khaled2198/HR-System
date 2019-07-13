
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,createBottomTabNavigator} from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from "../screens/auth/login.screen";
import SignUpScreen from "../screens/auth/signup.screen";
import HomeScreen from "../screens/home/home.screen";
import VacationScreen from "../screens/home/vacations.screen";
import NewVacationScreen from "../screens/forms/new_vacation.screen";
import TasksScreen from "../screens/home/tasks.screen"
const VacationsStack = createStackNavigator({
    Vacations: {
        screen: VacationScreen
    },
    NewVacation: {
        screen: NewVacationScreen
    }
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
    Tasks:{
        screen: TasksScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-code-working' size={25} color={tintColor} />)
        }
    },
    Vacations: {
        screen: VacationsStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-pause' size={25} color={tintColor} />)
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-home' size={25} color={tintColor} />)
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

export default createAppContainer(HomeNavigator);