import React from 'react';
import {View,Text,Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import postList from '../screens/home/postList';
import boardList from '../screens/board/boardList';
import chatList from '../screens/chat/chatList';
import serviceList from '../screens/services/serviceList';
import issuesList from '../screens/issues/issuesList';
import styles from './styles'
 
const navigator=createMaterialBottomTabNavigator({
    Home: { screen: postList,  
        navigationOptions:{ 
            tabBarVisible:true,
            tabBarIcon: ({ tintColor ,focused}) => (  
                focused ?
                <View style={{width:50,alignItems:'center'}}>
                    <View style={styles.tabView}>
                        <Image style={{width:16,height:16}} source={require('../assets/home-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:12}}>Home</Text>
                </View>:
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:16,height:16}} source={require('../assets/home-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:12}}>Home</Text>
                </View>
            ),  
        }  
    },  
    Board: { screen: boardList,  
        navigationOptions:{  
            tabBarLabel:'Board',  
            tabBarIcon: ({ tintColor,focused }) => (  
                focused ?
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:16,height:16}} source={require('../assets/clipboard-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:12}}>Board</Text>
                </View>:
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:16,height:16}} source={require('../assets/clipboard-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:12}}>Board</Text>
                </View>
            ),   
        }  
    },  
    Chat: { screen: chatList,  
        navigationOptions:{  
            tabBarLabel:'Chat',  
            tabBarIcon: ({ tintColor,focused }) => (  
                focused ?
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:16,height:16}} source={require('../assets/chat-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:12}}>Chat</Text>
                </View>:
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:16,height:16}} source={require('../assets/chat-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:12}}>Chat</Text>
                </View>
            ),  
        }  
    },  
    Services: {  
        screen: serviceList,  
        navigationOptions:{  
            tabBarLabel:'Services',  
            tabBarIcon: ({ tintColor,focused }) =>(  
                focused ?
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:16,height:16}} source={require('../assets/setting-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:12}}>Services</Text>
                </View>:
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:16,height:16}} source={require('../assets/setting-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:12}}>Services</Text>
                </View>
            ),
        }  
    },   
    Issues: {  
        screen: issuesList,  
        navigationOptions:{  
            tabBarLabel:'Issues',  
            tabBarIcon: ({ tintColor ,focused}) => (  
                focused ?
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:16,height:16}} source={require('../assets/tools-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:12}}>Issues</Text>
                </View>:
                <View style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:16,height:16}} source={require('../assets/tools-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:12}}>Issues</Text>
                </View>
            ), 
        }  
    },  
},  
{  
  activeColor: '#000',  
  inactiveColor: '#fff',  
  barStyle: { backgroundColor: 'white',height:80},  
  labeled:false,
  tabBarLabelSize:30
})
export default createAppContainer(navigator);