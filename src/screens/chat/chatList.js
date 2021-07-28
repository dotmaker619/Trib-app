import React,{Component} from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import styles from '../styles'

export default class ChatList extends Component{
    constructor(props){
        super(props)
        this.state={
            commnityId:'5f969d104295fb69ac1299bd',
            chats:[1,2,3,4,5,6,7,8,9]
        }
        global.width=Dimensions.get('window').width;
        global.height=Dimensions.get('window').height;
    }
    async componentDidMount(){
        var axios = require('axios');
        var that=this
        let url=''
        let token=await AsyncStorage.getItem('token')
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Chat</Text>
                    <Image style={styles.roundImage}></Image>
                </View>
                <View style={styles.subContainer}>
                    <View style={{
                        borderWidth:1,borderColor:'#dddddd',borderRadius:30,
                        padding:10,flexDirection:'row',alignItems:'center'
                    }}>

                        <Text style={{color:'#dddddd',fontWeight:'bold',flex:1}}>Search</Text>
                        <TextInput style={{flex:4,fontSize:16,padding:0,color:'#707070'}}></TextInput>
                        <Image style={{width:16,height:16,marginLeft:10}}
                            source={require('../../assets/search.png')}></Image>

                    </View>
                   <ScrollView style={{marginTop:10}}>
                        {
                        this.state.chats.map((value,key)=>{
                            return(
                                <View key={key} style={{paddingTop:20}}>
                                    <View style={{flexDirection:'row',}}>
                                        <View style={{flex:1}}>
                                            <Image style={styles.roundImage} ></Image>    
                                        </View>
                                        <View style={{marginLeft:20,flex:4}}>
                                            <Text>{'Sam moore'}</Text>
                                            <Text style={{color:'#707070',fontSize:12}}>Hell, how are you?</Text>
                                        </View>
                                        <Text style={{color:'#707070',flex:1}}>6:30 pm</Text>
                                    </View>
                                    <View style={styles.line} ></View>
                                </View>
                            )
                        })
                        }
                        <View style={{height:180}}></View>
                   </ScrollView>
                </View>
            </View>
        )
    }
}