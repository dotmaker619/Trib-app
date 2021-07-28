import {createAppContainer,} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import boardList from '../screens/board/boardList'
import createNotification from '../screens/board/createNotification'

const naviator=createStackNavigator({
    BoardList:{
        screen:boardList,
        navigationOptions:{
            headerShown:false
        }
    },
    CreateNotification:{
        screen:createNotification,
        navigationOptions:{
            headerShown:false
        }
    },
});
export default createAppContainer(naviator);