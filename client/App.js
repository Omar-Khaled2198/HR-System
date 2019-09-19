/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppNavigator from "./src/navigations/app_navigator"
import {Delete} from "./src/utils/storage.utils";

console.disableYellowBox = true;

class App extends Component {

    // async componentDidMount(){
    //     await Delete("account");
    // }
    render() {
        return (
            <AppNavigator/>
        );
    }
};


export default App;
