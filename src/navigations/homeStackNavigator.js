import {createAppContainer,} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import createPost from '../screens/home/createPost'
import postList from '../screens/home/postList'
import postDetails from '../screens/home/postDetails'
import comment from '../screens/home/comment'
const naviator=createStackNavigator({
    PostList:{
        screen:postList,
        navigationOptions:{
            headerShown:false
        }
    },
    PostDetails:{
        screen:postDetails,
        navigationOptions:{
            headerShown:false
        }
    },
    Comment:{
        screen:comment,
        navigationOptions:{
            headerShown:false
        }
    },
    CreatePost:{
        screen:createPost,
        navigationOptions:{
            headerShown:false
        }
    }
},
{
    initialRouteName:'PostList'
}
);
export default createAppContainer(naviator);