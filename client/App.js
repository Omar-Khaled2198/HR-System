/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import AppNavigator from "./src/navigations/app_navigator"


console.disableYellowBox = true;
const App = () => {
  return (
    <AppNavigator/>
  );
};


export default App;
