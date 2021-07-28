import React,{Component} from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,ScrollView,
    Dimensions} from 'react-native';
import styles from './styles';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            password:'',
            confirmPassword:'',
            email:''
        }
        global.height=Dimensions.get('screen').height
    }
    componentDidMount(){
        let email=this.props.navigation.state.params
        this.setState({email})
    }
    async resetPassword(){
        let {password,confirmPassword,email}=this.state
        if(password===confirmPassword){
            var axios = require('axios');
            let token=await AsyncStorage.getItem('token')
            let url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/member/reset-pwd?email='
            url+=email+'&newPwd='+password
            var config = {
                method: 'post',
                url: url,
                headers: { 
                    'X-Authorization': 'Bearer '+token
                }
            };
            
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                this.props.navigation.navigate('Login')
            })
            .catch(function (error) {
                console.log(error);
                alert(error)
            });   
        }
        else{
            alert('Please enter password and confirm password correctly!')
        }
    }
    render(){
        return(
                <ScrollView style={{backgroundColor:'white'}}>
                    <View style={[styles.container,{height:global.height-150}]}>
                        <View style={{width:'100%',flex:3,alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:130,height:60}} source={require('../../assets/logo.png')} ></Image>
                        </View>
                        <View style={{flex:1.5,justifyContent:'center'}}>
                            <Text style={{fontSize:28,fontWeight:'bold',color:'#139EDA'}}>Enter New Password</Text>
                        </View>
                        <View style={{flex:1,width:'100%'}}>
                            <TextInput
                                placeholder='Enter New Password'
                                value={this.state.password.toString()}
                                style={styles.textInput}
                                secureTextEntry
                                onChangeText={(password)=>this.setState({password})}
                            /> 
                        </View> 
                        <View style={{flex:1,width:'100%'}}>
                            <TextInput
                                placeholder='Confirm New Password'
                                value={this.state.confirmPassword.toString()}
                                style={styles.textInput}
                                secureTextEntry
                                onChangeText={(confirmPassword)=>this.setState({confirmPassword})}
                            /> 
                        </View> 
                        <View style={{flex:1,width:'100%',alignItems:'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.resetPassword()}>
                                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>reset Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
        )
    }
}