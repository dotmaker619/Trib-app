import React,{Component} from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,Dimensions} from 'react-native';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles'

export default class PostList extends Component{
    constructor(props){
        super(props)
        this.state={
            communityName:'',
            communityId:'',
            photo:'',
            posts:[],
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

        url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/post/get-by-communityId/'
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
                posts:data.result.posts,
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
                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Home</Text>
                    <Image source={{uri:this.state.photo?this.state.photo:'a'}}
                        style={styles.roundImage}></Image>
                </View>
                <View style={styles.subContainer}>
                   <Text style={{fontWeight:'bold',fontSize:16}}>{this.state.communityName}</Text>
                   <ScrollView style={{marginTop:10}}>
                        {
                        this.state.posts.map((value,key)=>{
                            let description=value.description
                            if(description.length>60)description =description.substr(0,60)+'...'
                            return(
                                <TouchableOpacity key={key} style={{paddingTop:20}}
                                    onPress={()=>this.props.navigation.navigate('PostDetails',{
                                        communityId:value.community,
                                        photo:this.state.photo,
                                        post:value
                                    })}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Image source={{uri:value.photo?value.photo:'a'}}
                                             style={styles.roundImage} ></Image>
                                        <View style={{marginLeft:10,}}>
                                            <Text>{value.memberName}</Text>
                                            <Text style={{color:'#707070',fontSize:14}}>
                                                {moment(value.createDate).format('DD')}th {moment(value.createDate).format('MMM YYYY')}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{marginTop:20,color:'#707070',fontSize:16}}>{description}</Text>
                                    {
                                        value.images &&
                                        <Image  source={{uri:value.images[0]}}
                                            style={{marginTop:20,borderRadius:10,width:'100%',height:150,
                                            borderRadius:10,backgroundColor:'#dddddd'}}
                                            ></Image>
                                    }
                                    <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image style={styles.image}
                                                source={require('../../assets/hands-blue.png')}></Image>
                                            <Text style={{color:'#707070',fontSize:16}}> {value.thanksCount?value.thanksCount:0}</Text>
                                        </TouchableOpacity>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image style={[styles.image,{marginLeft:30}]}
                                                source={require('../../assets/chat-grey.png')}></Image>
                                            <Text style={{color:'#707070',fontSize:16}}> {value.commentsCount?value.commentsCount:0} Comments</Text>
                                        </View>
                                    </View>
                                    <View style={styles.line} ></View>
                                </TouchableOpacity>
                            )})
                        }
                        <View style={{height:75}}></View>
                   </ScrollView>
                   <TouchableOpacity style={[styles.plusButton,{
                        marginTop:global.height-280,
                        marginLeft:global.width-70,}]}
                        onPress={()=>this.props.navigation.navigate('CreatePost',{
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