import {createAppContainer,} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import chatList from '../screens/chat/chatList'

const naviator=createStackNavigator({
    ChatList:{
        screen:chatList,
        navigationOptions:{
            headerShown:false
        }
    },
});
export default createAppContainer(naviator);