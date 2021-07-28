/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/navigations/materialBottomtabNavigator'
import App from './src/navigations/memberStackNavigator'
// import App from './src/screens/home'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
