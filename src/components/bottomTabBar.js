import React,{Component} from 'react';
import {View,Text,Image,TouchableOpacity,Dimensions} from 'react-native';
import styles from './styles'
 
export default class BottomTabBar extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'home'
        }
        global.height=Dimensions.get('screen').height
        global.width=Dimensions.get('screen').width
    }
    render(){
        return(
            <View style={[styles.bottomTabBar,{marginTop:global.height-235,width:global.width}]}>
            {
                this.state.selectedTab=='home' ?
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'home'});this.props.homeClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:24,height:24}} source={require('../assets/home-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:16}}>Home</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'home'});this.props.homeClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:24,height:24}} source={require('../assets/home-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:16}}>Home</Text>
                </TouchableOpacity>
            }
            {
                this.state.selectedTab=='board' ?
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'board'});this.props.boardClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:24,height:24}} source={require('../assets/clipboard-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:16}}>Board</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'board'});this.props.boardClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:24,height:24}} source={require('../assets/clipboard-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:16}}>Board</Text>
                </TouchableOpacity>
            }
            {
                this.state.selectedTab=='chat' ?
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'chat'});this.props.chatClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:24,height:24}} source={require('../assets/chat-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:16}}>Chat</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'chat'});this.props.chatClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:24,height:24}} source={require('../assets/chat-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:16}}>Chat</Text>
                </TouchableOpacity>
            }
            {
                this.state.selectedTab=='services' ?
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'services'});this.props.servicesClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:24,height:24}} source={require('../assets/setting-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:16,width:60}}>Services</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'services'});this.props.servicesClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:24,height:24}} source={require('../assets/setting-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:16,width:60}}>Services</Text>
                </TouchableOpacity>
            }
            {
                this.state.selectedTab=='issues' ?
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'issues'});this.props.issuesClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView}>
                        <Image style={{width:24,height:24}} source={require('../assets/tools-white.png')}></Image> 
                    </View>
                    <Text style={{color:'#0D9EDD',fontSize:16}}>Issues</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={()=>{this.setState({selectedTab:'issues'});this.props.issuesClick()}}
                    style={{width:50,alignItems:'center',}}>
                    <View style={styles.tabView1}>
                        <Image style={{width:24,height:24}} source={require('../assets/tools-grey.png')}></Image> 
                    </View>
                    <Text style={{color:'#707070',fontSize:16}}>Issues</Text>
                </TouchableOpacity>
            }
            </View>
        )
    }
}
