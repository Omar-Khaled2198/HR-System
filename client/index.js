/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FirebaseHandler from "./src/utils/firebase_handler.util";

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', FirebaseHandler.ListenToNotifications());

AppRegistry.registerComponent(appName, () => App);
