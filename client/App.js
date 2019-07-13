/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import LoginScreen from "./src/screens/auth/login.screen"
import SignUpScreen from "./src/screens/auth/signup.screen"
import AppNavigator from "./src/navigations/app_navigator"


console.disableYellowBox = true;
const App = () => {
  return (
    <AppNavigator/>
  );
};


export default App;
