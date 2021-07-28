import React,{Component} from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,Dimensions} from 'react-native';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles'

export default class PostDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            communityId:'',
            photo:'',
            post:{},
            comments:[]
        }
        global.width=Dimensions.get('window').width;
        global.height=Dimensions.get('window').height;
    }
    async componentDidMount(){
        let {communityId,photo,post}=this.props.navigation.state.params
        let that=this
        this.setState({
            communityId,
            photo,
            post
        })

        var axios = require('axios');
        var url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/comment/get-by-post-id/'
        url+=post.community
        // url+='5f96b01f4295fb69ac1299c2'
        let token=await AsyncStorage.getItem('token')
        var config = {
          method: 'get',
          url: url,
          headers: { 
            'X-Authorization':'Bearer '+token , 
            'Content-Type': 'application/json'
          }
        };
        
        axios(config)
        .then(function (response) {
            let data=response.data
          console.log(JSON.stringify(data));
          that.setState({comments:data.result})
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image style={{width:20,height:20}} source={require('../../assets/arrow-left-white.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>   Post details</Text>
                    </View>
                    <Image source={{uri:this.state.photo?this.state.photo:'a'}}
                        style={styles.roundImage}></Image>
                </View>
                <View style={styles.subContainer}>
                   <ScrollView style={{marginTop:10}}>
                        <View style={{paddingTop:20}} >
                            <View style={{flexDirection:'row',}}>
                                <Image source={{uri:this.state.post.photo?this.state.post.photo:'a'}}
                                     style={styles.roundImage} ></Image>
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{this.state.post.memberName}</Text>
                                    <Text style={{color:'#707070',fontSize:14}}>
                                        {moment(this.state.post.createDate).format('DD')}th {moment(this.state.post.createDate).format('MMM YYYY')}
                                    </Text>
                                </View>
                            </View>
                            <Text style={{marginTop:20,color:'#707070',fontSize:16}}>{this.state.post.description}</Text>
                            {
                                this.state.post.images && this.state.post.images[0] &&
                                <Image   source={{uri:this.state.post.images[0]}}
                                    style={{marginTop:20,borderRadius:10,width:'100%',height:150,
                                    borderRadius:10,backgroundColor:'#dddddd'}}
                                    ></Image>
                            }
                            <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={styles.image}
                                        source={require('../../assets/hands-blue.png')}></Image>
                                    <Text style={{color:'#707070',fontSize:16}}> {this.state.post.thanksCount?this.state.post.thanksCount:0}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comment',{
                                        communityId:this.state.communityId,
                                        post:this.state.post,
                                        comments:this.state.comments,                                                                               
                                    })}
                                    style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={[styles.image,{marginLeft:30}]}
                                        source={require('../../assets/chat-grey.png')}></Image>
                                    <Text style={{color:'#707070',fontSize:16}}> {this.state.post.commentsCount?this.state.post.commentsCount:0} Comments</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line} ></View>
                        </View>
                        {
                            this.state.comments.map((value,key)=>{
                            return(
                                <TouchableOpacity key={key} style={{flexDirection:'row',paddingTop:20,paddingRight:40}}>
                                    <View style={{flex:1}}>
                                        <Image source={{uri:value.photo?value.photo:'a'}}
                                            style={styles.roundImage} ></Image>
                                    </View>
                                    <View style={{marginLeft:20,marginTop:10,flex:6}}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={{fontWeight:'bold',fontSize:16}}>{value.memberName}</Text>
                                            <Text style={{color:'#707070',fontSize:14}}>
                                                {moment(value.createDate).format('DD').padStart(2,'0')}
                                                {moment(value.createDate).format(' MMM YYYY')}
                                            </Text>
                                        </View>
                                        <Text style={{marginTop:5,color:'#707070',fontSize:16}}>{value.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            )})
                        }
                        <View style={{height:75}}></View>
                   </ScrollView>
                </View>
            </View>
        )
    }
}