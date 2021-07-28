import React,{Component} from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import {Modal} from 'react-native-paper'
import ImagePicker from 'react-native-image-picker';
import styles from '../styles'
export default class CreateNotification extends Component{
    constructor(props){
        super(props)
        this.state={
            communityId:'',
            photo:'',
            description:'',
            isSuccess:false,
            name:'',
            newDescription:'',
            images:'',
            isCreatePoll:true,
            isMultiple:true,
            options:['',''],
        }
        global.width=Dimensions.get('window').width;
        global.height=Dimensions.get('window').height;
    }
    async componentDidMount(){   
        let {communityId,photo}=this.props.navigation.state.params
        this.setState({communityId,photo})
    }
    async submit(){
        if(this.state.description==''){
            alert('Please enter description.')
            return
        }
        var axios = require('axios');
        var body={
            "description":this.state.description,
            "community":this.state.communityId
        }
        var that=this
        var data = JSON.stringify(body);
        let token=await AsyncStorage.getItem('token')
        var url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/post'
        var config = {
        method: 'post',
        url: url,
        headers: { 
                'X-Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            console.log('------------222----------',JSON.stringify(response.data));
            that.setState({isSuccess:true})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    openGallery(){    
        const options = {
            title: 'Select Your Avatar.',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel || response.error || response.customButton) {
                console.log('-----fail-----')
                console.log(response.didCancel)
                console.log(response.error)
                console.log(response.customButton)
            } else { 
                console.log('-----ok-----',response.uri)
                this.setState({
                    images:response.uri,
                })
            }
        })
      }
      addOption(){
          let options=this.state.options
          options.push('')
          this.setState({options})
      }
    render(){
        console.log('-----------------',this.state.options)
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image style={{width:20,height:20}} source={require('../../assets/arrow-left-white.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>  Create Notification</Text>
                    </View>
                    <Image source={{uri:this.state.photo?this.state.photo:'a'}}
                        style={styles.roundImage}></Image>
                </View>
                <ScrollView style={styles.subContainer}>
                    <TextInput style={styles.textInput} 
                        placeholder='Name'
                        value={this.state.name}
                        onChangeText={(name)=>this.setState({name})}
                    />
                    <TextInput 
                        style={styles.description}
                        placeholder='Description'
                        multiline
                        textAlignVertical='top'
                        value={this.state.description}
                        onChangeText={(description)=>this.setState({description})}
                    />
                    <View style={styles.selectImage}>
                    {
                        this.state.images ?
                        <Image style={{width:100,height:'100%'}} source={{uri:this.state.images}}></Image>:
                        <TouchableOpacity style={{alignItems:'center'}}
                            onPress={()=>this.openGallery()}>
                            <Image style={{width:30,height:30}} source={require('../../assets/camera-grey.png')}></Image>
                            <Text style={{color:'#bbbbbb'}}>Select Image</Text>
                        </TouchableOpacity>
                    }
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                        <TouchableOpacity onPress={()=>this.setState({isCreatePoll:!this.state.isCreatePoll})}
                            style={{backgroundColor:'#0C9FDE',padding:2,
                                width:20,height:20,
                                justifyContent:'center',alignItems:'center'
                        }}>
                            {
                                this.state.isCreatePoll &&
                                <Image style={{width:14,height:14}}
                                    source={require('../../assets/check.png')}></Image>                            
                            }
                        </TouchableOpacity>
                        <Text style={{color:'#bbbbbb',fontWeight:'bold',fontSize:16}}>  Create poll</Text>
                    </View>
                    {
                        this.state.isCreatePoll &&
                        <View style={{marginTop:10}}>
                            {
                                this.state.options.map((value,key)=>{
                                    return(
                                        <TextInput key={key} 
                                            style={[styles.textInput,{marginTop:20}]} 
                                            placeholder={'Option '+(key+1).toString()}
                                            value={this.state.options[key]}
                                            onChangeText={(txt)=>{
                                                let options=this.state.options
                                                options[key]=txt
                                                this.setState({options})
                                            }}
                                        />
                                    )
                            })}
                            <TouchableOpacity onPress={()=>this.addOption()}
                                style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:20}}>
                                <View style={{backgroundColor:'#0C9FDE',
                                        width:16,height:16,
                                        justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'white',fontSize:18}}>+</Text>
                                </View>
                                <Text style={{color:'#bbbbbb',fontWeight:'bold',fontSize:16}}>  Add Option</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:60}}>
                        <TouchableOpacity onPress={()=>this.setState({isMultiple:!this.state.isMultiple})}
                            style={{backgroundColor:'#0C9FDE',padding:2,
                                width:20,height:20,
                                justifyContent:'center',alignItems:'center'}}>
                            {
                                this.state.isMultiple &&
                                <Image style={{width:14,height:14}}
                                    source={require('../../assets/check.png')}></Image>                            
                            }
                        </TouchableOpacity>
                        <Text style={{color:'#bbbbbb',fontWeight:'bold',fontSize:16}}>  Allow multiple selections</Text>
                    </View> 
                    <View style={{width:'100%',alignItems:'center',marginTop:30}}>
                        <TouchableOpacity style={styles.btn} onPress={()=>this.submit()}>
                            <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:75}}></View>
                </ScrollView>
                <Modal visible={this.state.isSuccess}>
                    <View style={{width:'100%',height:'100%',padding:20,justifyContent:'center'}}>
                        <View style={{width:'100%',height:250,backgroundColor:'white',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width:50,height:50}} source={require('../../assets/hand.png')}></Image>
                            <Text style={{fontSize:20,color:'#0BD318',fontWeight:'bold'}}>Successfully</Text>
                            <Text style={{fontSize:16,color:'#aaaaaa'}}>You have create notification{'\n'}              successfully</Text>
                            <TouchableOpacity style={[styles.btn,{marginTop:20}]}
                                onPress={()=>this.props.navigation.goBack()}>
                                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}