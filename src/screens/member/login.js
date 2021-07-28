import React,{Component} from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,ScrollView,
    Dimensions} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'potusowmya.sow@gmail.com',
            password:'sowmya123',
        }
        global.height=Dimensions.get('screen').height
    }
    async login(){
        var axios = require('axios');
        var body={
            "username":this.state.email,
            "password":this.state.password
        }
        var data = JSON.stringify(body);

        var config = {
        method: 'post',
        url: 'http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/auth/login',
        headers: { 
            'X-Requested-With': 'XMLHttpRequest', 
            'Content-Type': 'application/json'
        },
        data : data
        };
        let that=this
        await axios(config)
        .then(function (response) {
            let data=response.data
            if(data.token){
                that.setState({
                    token:data.token,
                })
                AsyncStorage.setItem('token',data.token)     
                that.props.navigation.navigate('MaterialBottomTabNavigator')               
            }
        })
        .catch(function (error) {
            alert('Invalid username or password')
        });
    }
    render(){
        return(
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={[styles.container,{height:global.height-75}]}>
                    <View style={{width:'100%',flex:5,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{width:130,height:60}} source={require('../../assets/logo.png')} ></Image>
                    </View>
                    <View style={{flex:2,justifyContent:'center'}}>
                        <Text style={{fontSize:28,fontWeight:'bold',color:'#139EDA'}}>Log in</Text>
                    </View>
                    <View style={{flex:1,width:'100%'}}>
                        <TextInput
                            ref='email'
                            placeholder='Email'
                            value={this.state.email.toString()}
                            keyboardType='email-address'
                            onChangeText={(email)=>this.setState({email})}
                            autoCapitalize='none'
                            style={styles.textInput}
                            onSubmitEditing={()=>this.refs.password.focus()}
                        ></TextInput>
                    </View>
                    <View style={{flex:1,width:'100%'}}>
                        <TextInput
                            ref='password'
                            placeholder='Password'
                            value={this.state.password.toString()}
                            onChangeText={(password)=>this.setState({password})}
                            secureTextEntry
                            style={styles.textInput}
                        ></TextInput>
                    </View>
                    <View style={{flex:1,width:'100%',alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                            <Text style={{color:'#0D9EDD',fontSize:16,fontWeight:'bold',textDecorationLine:'underline'}}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={()=>this.login()}>
                        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Log in</Text>
                    </TouchableOpacity>
                    <View style={{flex:1,width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        
                        <Text style={{marginLeft:10,color:'#707070',fontSize:16,fontWeight:'bold'}}>Don't have an account? </Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                            <Text style={{color:'#0D9EDD',textDecorationLine:'underline',fontSize:16,fontWeight:'bold',marginLeft:10}}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        )
    }
}