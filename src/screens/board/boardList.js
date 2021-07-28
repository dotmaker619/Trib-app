import React,{Component} from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,Dimensions} from 'react-native';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles'

export default class BoardList extends Component{
    constructor(props){
        super(props)
        this.state={
            communityName:'',
            communityId:'',
            photo:'',
            notices :[],
        }
        global.width=Dimensions.get('window').width;
        global.height=Dimensions.get('window').height;
    }
    async componentDidMount(){
        var axios = require('axios');
        var that=this
        let url=''
        let communityId=''
        let token=await AsyncStorage.getItem('token')
        url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/member/me'
        var config = {
            method: 'get',
            url: url,
            headers: { 
                'X-Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            }
        };

        await axios(config)
        .then(function (response) {
            let data=response.data
            communityId=data.result.community?data.result.community[0]:''
            let photo=data.result.photo
            that.setState({communityId,photo})
        })
        .catch(function (error) {
            console.log(error);
            return;
        });

        url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/notice/get-by-community/'
        url+=communityId
        var config = {
            method: 'get',
            url: url,
            headers: { 
                'X-Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            }
        };
        
        await axios(config)
        .then(function (response) {
            let data=response.data
            that.setState({
                notices:data.result.services,
                communityName:data.result.communityName
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Board</Text>
                    <Image source={{uri:this.state.photo?this.state.photo:'a'}}
                        style={styles.roundImage}></Image>
                </View>
                <View style={styles.subContainer}>
                   <Text style={{fontWeight:'bold',fontSize:16}}>{this.state.communityName}</Text>
                   <ScrollView style={{marginTop:10}}>
                        {
                        this.state.notices.map((value,key)=>{
                            return(
                                <View key={key} style={{paddingTop:20}}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image source={{uri:value.photo?value.photo:'a'}}
                                             style={styles.roundImage} ></Image>
                                        <View style={{marginLeft:10}}>
                                            <Text>{value.memberName}</Text>
                                            <Text style={{color:'#707070',fontSize:14}}>
                                                {moment(value.createDate).format('DD')}th {moment(value.createDate).format('MMM YYYY')}
                                            </Text>
                                        </View>
                                    </View>                                    
                                    <Text style={{marginTop:20,fontSize:18}}>{value.title}</Text>
                                    <Text style={{marginTop:20,color:'#707070',fontSize:16}}>{value.description}</Text>
                                    {
                                       !value.description &&
                                        <View style={{height:60}}></View>
                                    }
                                    <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image style={styles.image}
                                                source={require('../../assets/chat-grey.png')}></Image>
                                            <Text style={{color:'#707070',fontSize:16}}>  Respond privately</Text>
                                        </TouchableOpacity>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                        {
                                            value.voteRequired ?
                                            <Image style={[styles.image,{marginLeft:30}]}
                                                source={require('../../assets/vote-blue.png')}></Image>:
                                            <Image style={[styles.image,{marginLeft:30}]}
                                                source={require('../../assets/vote-grey.png')}></Image>
                                        }
                                            <Text style={{color:'#707070',fontSize:16}}>  vote</Text>
                                        </View>
                                    </View>
                                    <View style={styles.line} ></View>
                                </View>
                            )})
                        }
                        <View style={{height:75}}></View>
                   </ScrollView>
                   <TouchableOpacity style={[styles.plusButton,{
                        marginTop:global.height-280,
                        marginLeft:global.width-70,}]}
                        onPress={()=>this.props.navigation.navigate('CreateNotification',{
                            communityId:this.state.communityId,
                            photo:this.state.photo
                        })}
                    >
                        <Image style={styles.image60} source={require('../../assets/plus.png')}></Image>
                   </TouchableOpacity>
                </View>
            </View>
        )
    }
}