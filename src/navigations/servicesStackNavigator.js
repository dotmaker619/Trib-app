import {createAppContainer,} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import serviceList from '../screens/services/serviceList'

const naviator=createStackNavigator({
    ServiceList:{
        screen:serviceList,
        navigationOptions:{
            headerShown:false
        }
    },
});
export default createAppContainer(naviator);