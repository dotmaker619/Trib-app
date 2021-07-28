import {createAppContainer,} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import issuesList from '../screens/issues/issuesList'

const naviator=createStackNavigator({
    IssuesList:{
        screen:issuesList,
        navigationOptions:{
            headerShown:false
        }
    },
});
export default createAppContainer(naviator);