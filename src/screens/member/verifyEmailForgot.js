import React,{Component} from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,ScrollView,
    Dimensions} from 'react-native';
import { Modal } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
export default class VerifyEmailForgot extends Component{
    constructor(props){
        super(props);
        this.state={
            first:'',
            second:'',
            third:'',
            fourth:'',
            fifth:'',
            sixth:'',
            verifyRequestVisible:false,
            email:''
        }
        global.height=Dimensions.get('screen').height
    }
    componentDidMount(){
        let email=this.props.navigation.state.params
        this.setState({email})
    }
    async verify(){
        let {first,second,third,fourth,fifth,sixth}=this.state
        let OTP=first+second+third+fourth+fifth+sixth
        let url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/member/verify-reset-pwd-otp?email='
        url+=this.state.email+'&otp='+OTP
        let token=await AsyncStorage.getItem('token')
        var axios = require('axios');
        var config = {
            method: 'post',
            url:url,
            headers: { 
                'X-Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
            }
        };
        console.log('verify-reset-password-otp',config)
        let that=this
        await axios(config)
        .then(function (response) {
            let data=response.data
            if(data.status=='Success'){
                that.props.navigation.navigate('ResetPassword',that.state.email)
            }
        })
        .catch(function (error) {
            console.log(error);
            alert('wrong code')
            that.setState({
                first:'',
                second:'',
                third:'',
                fourth:'',
                fifth:'',
                sixth:''
            })
        });
    }

    async resend(){
        var axios = require('axios');
        let token=await AsyncStorage.getItem('token')
        var config = {
            method: 'get',
            url: 'http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/member/resend-otp',
            headers: { 
                'X-Authorization': 'Bearer '+token, 
            }
        };
        let that=this
        await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            that.setState({verifyRequestVisible:true})
        })
        .catch(function (error) {
            console.log(error);
            alert('failed')
        });
    }

    render(){
        return(
                <ScrollView style={{backgroundColor:'white'}}>
                    <View style={[styles.container,{height:global.height-150}]}>
                        <View style={{width:'100%',flex:3,alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:130,height:60}} source={require('../../assets/logo.png')} ></Image>
                        </View>
                        <View style={{flex:1.5,justifyContent:'center'}}>
                            <Text style={{fontSize:28,fontWeight:'bold',color:'#139EDA'}}>Verify your Email</Text>
                            <Text style={{color:'#707070',fontSize:16,fontWeight:'bold'}}>An 6-digit code has been sent {'\n'}    to your registered Email</Text>
                        </View>

                        <View style={styles.digitsView}>
                            <View>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.first.toString()}
                                    style={styles.digitinput}
                                    keyboardType='number-pad'
                                    onChangeText={(first)=>this.setState({first})}
                                /> 
                            </View> 
                            <View>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.second.toString()}
                                    style={styles.digitinput}
                                    keyboardType='number-pad'
                                    onChangeText={(second)=>this.setState({second})}
                                /> 
                            </View> 
                            <View>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.third.toString()}
                                    style={styles.digitinput}
                                    keyboardType='number-pad'
                                    onChangeText={(third)=>this.setState({third})}
                                /> 
                            </View> 
                            <View>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.fourth.toString()}
                                    style={styles.digitinput}
                                    keyboardType='number-pad'
                                    onChangeText={(fourth)=>this.setState({fourth})}
                                /> 
                            </View> 
                            <View>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.fifth.toString()}
                                    style={styles.digitinput}
                                    keyboardType='number-pad'
                                    onChangeText={(fifth)=>this.setState({fifth})}
                                /> 
                            </View> 
                            <View>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.sixth.toString()}
                                    style={styles.digitinput}
                                    keyboardType='number-pad'
                                    onChangeText={(sixth)=>this.setState({sixth})}
                                /> 
                            </View> 
                        </View>
                        <View style={{flex:0.5}}>                   
                            <TouchableOpacity onPress={()=>this.resend()}> 
                                <Text style={{color:'blue'}}>Resend code</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,width:'100%',alignItems:'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.verify()}>
                                <Text style={{color:'white'}}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* ---------------verification modal----------------- */}
                    <Modal visible={this.state.verifyRequestVisible}>
                        <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                            <View style={styles.modalContent}>
                                <Text style={{fontSize:18}}>We have sent you a mail{'\n'}
                                    on you registered email{'\n'}        for verification.</Text>
                                <TouchableOpacity style={[styles.btn,{marginTop:10}]} onPress={()=>this.setState({verifyRequestVisible:false})}>
                                    <Text style={{color:'white'}}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
        )
    }
}