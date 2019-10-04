/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppNavigator from "./src/navigations/app_navigator"

console.disableYellowBox = true;

class App extends Component {


    render() {
        return (
            <AppNavigator/>
        );
    }
};


export default App;
