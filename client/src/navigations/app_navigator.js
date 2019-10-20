import React from "react";
import {View, Text} from "react-native";
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator
} from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from "../screens/auth/login.screen";
import SignUpScreen from "../screens/auth/signup.screen";
import HomeScreen from "../screens/home/home.screen";
import VacationsScreen from "../screens/home/vacations.screen";
import VacationCreationScreen from "../screens/form/vacation_creation.screen";
import TasksScreen from "../screens/home/tasks.screen";
import FeedbackScreen from "../screens/home/feedback.screen";
import ForgetPasswordScreen from "../screens/auth/forget_password.screen";
import ProfileCreationScreen from "../screens/form/profile_creation.screen";
import SettingsScreen from "../screens/settings/setting.screen";
import LogoutScreen from "../screens/auth/logout.screen";
import VacationScreen from "../screens/info/vacation.screen";
import AttandanceScreen from "../screens/home/attandnace.screen";

const VacationsStack = createStackNavigator({
    Vacations: {
        screen: VacationsScreen
    },
    NewVacation: {
        screen: VacationCreationScreen
    },
    Vacation: {
        screen: VacationScreen,
        navigationOptions: () => ({
            header: null
        })
    }
}, {
    animationEnabled: true,
    swipeEnabled: true,
})

VacationsStack.navigationOptions = ({navigation}) => {
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
            tabBarIcon: ({tintColor}) => (<Ionicons name='ios-home' size={25} color={tintColor}/>)
        }
    },
    Attandance: {
        screen: AttandanceScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Ionicons name='ios-calendar' size={25} color={tintColor}/>)
        }
    },
    Vacations: {
        screen: VacationsStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Ionicons name='ios-pause' size={25} color={tintColor}/>)
        }
    },
    Tasks: {
        screen: TasksScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Ionicons name='ios-code-working' size={25} color={tintColor}/>)
        }
    },
    Feedback: {
        screen: FeedbackScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Ionicons name='ios-chatboxes' size={25} color={tintColor}/>)
        }
    }

}, {
    animationEnabled: true,
    swipeEnabled: true,
})


const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    SignUp: {
        screen: SignUpScreen
    },
    ProfileCreation: {
        screen: ProfileCreationScreen
    },
    ForgetPassword: {
        screen: ForgetPasswordScreen
    }
}, {
    animationEnabled: true,
    swipeEnabled: true,
});

const HomeDrawerNavigator = createDrawerNavigator({

    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            drawerIcon: ({tintColor}) => (<Ionicons name='ios-home' size={25} color={tintColor}/>)
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            drawerIcon: ({tintColor}) => (<Ionicons name='md-settings' size={25} color={tintColor}/>)
        }
    },
    Logout: {
        screen: LogoutScreen,
        navigationOptions: {
            drawerIcon: ({tintColor}) => (<Ionicons name='md-exit' size={25} color={tintColor}/>),

        },
    }
})

const AppNavigator = createStackNavigator({

    Auth: {
        screen: AuthNavigator
    },
    Home: {
        screen: HomeDrawerNavigator
    }

}, {
    headerMode: 'none',
    animationEnabled: true,
    swipeEnabled: true,
})

export default createAppContainer(AppNavigator);