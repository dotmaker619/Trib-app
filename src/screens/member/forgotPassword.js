import React,{Component} from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,ScrollView,
    Dimensions} from 'react-native';
import { Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            verifyRequestVisible:false
        }
        global.height=Dimensions.get('screen').height
    }
    async sendEmail(){
        var axios = require('axios');
        let token=await AsyncStorage.getItem('token')
        var data = '';
        var url= 'http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/member/send-otp-for-reset-pwd?email='
        url+=this.state.email
        var config = {
          method: 'post',
          url:url,
          headers: { 
            'Content-Type': 'application/json', 
            'X-Authorization': 'Bearer '+token
          },
          data : data
        };
        console.log('-----------',config)
        let that=this
        await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            that.setState({verifyRequestVisible:true})
        })
        .catch(function (error) {
          console.log(error);
          alert(error)
        });
    }
    render(){
        return(
                <ScrollView style={{backgroundColor:'white'}}>
                    <View style={[styles.container,{height:global.height-150}]}>
                        <View style={{width:'100%',flex:5,alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:130,height:60}} source={require('../../assets/logo.png')} ></Image>
                        </View>
                        <View style={{flex:2,justifyContent:'center'}}>
                            <Text style={{fontSize:28,fontWeight:'bold',color:'#139EDA'}}>Enter your Email</Text>
                            <Text style={{fontSize:16,color:'#707070',fontSize:16,fontWeight:'bold'}}>Please enter your register mail {'\n'}    to reset your password</Text>
                        </View>
                        <View style={{flex:1,width:'100%'}}>
                            <TextInput
                                placeholder='Email'
                                autoCapitalize='none'
                                value={this.state.email.toString()}
                                keyboardType='email-address'
                                style={styles.textInput}
                                onChangeText={(email)=>this.setState({email})}
                            /> 
                        </View> 
                        <View style={{flex:1,width:'100%',alignItems:'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.sendEmail()}>
                                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Send OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* ---------------verification modal----------------- */}
                    <Modal visible={this.state.verifyRequestVisible}>
                        <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                            <View style={styles.modalContent}>
                                <Text style={{fontSize:18}}>We have sent you a mail{'\n'}
                                    on you registered email{'\n'}        for verification.</Text>
                                <TouchableOpacity style={[styles.btn,{marginTop:20}]} onPress={()=>{
                                    this.setState({verifyRequestVisible:false})
                                    this.props.navigation.navigate('VerifyEmailForgot',this.state.email)
                                }}>
                                    <Text style={{color:'white'}}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
        )
    }
}