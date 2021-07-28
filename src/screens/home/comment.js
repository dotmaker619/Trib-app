import React,{Component} from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles'

export default class Comment extends Component{
    constructor(props){
        super(props)
        this.state={
            communityId:'',
            post:{},
            description:'',
            comments:[],
            newComment:''
        }
        global.width=Dimensions.get('window').width;
        global.height=Dimensions.get('window').height;
    }
    async componentDidMount(){
        let description
        let {communityId,post,comments}=this.props.navigation.state.params
        if(post.description.length>60) {
            description =post.description.substr(0,60)+'...'
        }
        this.setState({communityId,post,description,comments })
    }

    async submitComment(){
        if(this.state.newComment==''){
            alert('Please enter comment.')
            return
        }
        console.log(this.state.newComment)
        var that=this
        var axios = require('axios');
        var body={
            "description":this.state.newComment,
            "post":this.state.communityId
        }
        var data = JSON.stringify(body);
        var url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/comment'
        let token=await AsyncStorage.getItem('token')
        var config = {
          method: 'post',
          url: url,
          headers: { 
            'X-Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        await axios(config)
        .then(function (response) {
            console.log('------3--------',JSON.stringify(response.data));
            that.props.navigation.goBack()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.top,{flex:1}]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={{uri:this.state.post.photo?this.state.post.photo:'a'}}
                                style={styles.roundImage} ></Image>
                        <Text style={{fontWeight:'bold',fontSize:16,color:'white'}}>   {this.state.post.memberName}</Text>
                    </View>
                    <Image style={{width:25,height:25}} source={require('../../assets/list.png')}></Image>
                </View>
                <View style={[styles.subContainer,{flex:5}]}>
                    <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image style={{width:20,height:20}} source={require('../../assets/arrow-left-black.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>   Comment</Text>
                    </View>
                    <View style={{flex:5}}>
                        <ScrollView style={{marginTop:40}}>
                            <View style={{paddingTop:20}}>
                                <View style={{flexDirection:'row'}}>
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

                                <Image   source={{uri:this.state.post.images && this.state.post.images[0]? this.state.post.images[0]:'a'}}
                                    style={{marginTop:20,borderRadius:10,width:'100%',height:150,
                                    borderRadius:10,backgroundColor:'#dddddd'}}
                                    ></Image>
                                <View style={styles.line} ></View>
                            </View>
                            <View style={{marginTop:40}}>
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
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{
                            borderRadius:30,
                            borderWidth:1,
                            borderColor:'#dddddd',
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            marginTop:20,
                            paddingHorizontal:20,
                            height:50
                        }}>
                        <TextInput style={{fontSize:18}}
                            placeholder='Write comment'
                            value={this.state.newComment.toString()}
                            autoCapitalize='none'
                            onChangeText={(newComment)=>this.setState({newComment})}
                        />
                        <TouchableOpacity onPress={()=>this.submitComment()}>
                            <Image style={{width:25,height:25}} source={require('../../assets/send.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}