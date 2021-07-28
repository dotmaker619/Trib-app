import React,{Component} from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,ScrollView,
    Dimensions,} from 'react-native';
import DeviceInfo from 'react-native-device-info'
import { Modal } from 'react-native-paper';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker'
export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            apartmentNumber:'',
            email:'',
            phone:'',
            photo:'',
            isAdmin:false,
            isAdminForBlock:'',
            password:'',
            confirmPassword:'',
            community:'Community',
            communities:[],
            
            communityExpand:false,
            isAgree:false,
            verifyRequestVisible:false,
            token:''
        }
        global.height=Dimensions.get('screen').height
    }
    async componentDidMount(){
        var axios = require('axios');        
        let token=await AsyncStorage.getItem('token')
        let url='http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/community/get-list'
        var config = {
            method: 'get',
            url: url,
            headers: { 
                'X-Authorization': 'Beareer '+token, 
                'Content-Type': 'application/json'
            }
        };
        var that=this
        var arr=[]
        axios(config)
        .then(function (response) {
            let data=response.data
            data.result.forEach(element => {
                if(arr.indexOf(element.name)==-1){
                    arr.push(element.name)
                }
            });
            that.setState({communities:arr})
        })
        .catch(function (error) {
        console.log(error);
});
    }
    async signup(){
        var pNumber=await DeviceInfo.getPhoneNumber()
        console.log(pNumber)
        let {firstName,lastName,apartmentNumber,email,community,password,confirmPassword}=this.state
        let communities=[];
        communities[0]=community
        if(password===confirmPassword){
            var axios = require('axios');
            var body={
                "firstName":firstName,
                "lastName":lastName,
                "apartmentNo":apartmentNumber,
                "email":email,
                "phone":pNumber,
                "password":password,
                "photo":'',
                "isAdmin":true,
                "isAdminForBlock":'kkk',
                "community":communities
            }
            console.log(body)
            // var body={
            //     "firstName": "Sairam",
            //     "lastName": "Reddy",
            //     "apartmentNo": "105",
            //     "email": "sairam200@gmail.com",
            //     "phone": "1872344411",
            //     "password": "Sairam123",
            //     "photo": "http://aws/bucket/image/file1.png",
            //     "isAdmin": true,
            //     "isAdminForBlock": "kkk",
            //     "community": [
            //     ]
            // }
            if(!this.checkAvailable(body))return
            var data = JSON.stringify(body);
            var config = {
            method: 'post',
            url: 'http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/member/signup',
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
                    AsyncStorage.setItem('token',data.token)   
                    that.setState({ 
                        token:data.token,
                        verifyRequestVisible:true,
                    })
                }
                else{
                    alert(data.message)
                }
            })
            .catch(function (error) {
                alert('email already exist')
            });
        }
        else{
            alert('Please enter password and confirm password correctly!')
        }
    }
    checkAvailable(body){
        if(body.firstName==''){
            alert('Please fill in the first name field.')
            return false
        }
        if(body.lastName==''){
            alert('Please fill in the last name field.')
            return false
        }
        if(body.email==''){
            alert('Please fill in the email field.')
            return false
        }
        if(body.password==''){
            alert('Please fill in the password field.')
            return false
        }
        return true
    }
    
    // async getMember(){
    //     this.setState({verifyRequestVisible:false})
    //     var axios = require('axios');
    //     var config = {
    //         method: 'get',
    //         url: 'http://Tribeapi-dev-env.eba-iezmmbi6.us-east-2.elasticbeanstalk.com/api/member/me',
    //         headers: { 
    //             'X-Authorization': 'Bearer '+this.state.token, 
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     let that=this
    //     await axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         let data=response.data
    //         if(data.status=='Success'){
    //             let otp=data.result.signupOTP
    //             that.props.navigation.navigate('VerifyEmail',otp)
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
    render(){
        let arr=[]
        this.state.communities.map((value,key)=>{
            let item={
                label:value,
                value:value,
            }
            arr.push(item)
        })
        return(
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={{padding:20}}>

                    <View style={{width:'100%',alignItems:'center',marginTop:50}}>
                        <Image style={{width:130,height:60}} source={require('../../assets/logo.png')} ></Image>
                    </View>
                    <View style={{width:'100%',alignItems:'center',marginTop:20,marginBottom:20}}>
                        <Text style={{fontSize:28,fontWeight:'bold',color:'#139EDA'}}>Sign up</Text>
                    </View>
                    <TextInput
                        ref='firstName'
                        placeholder='First Name'
                        value={this.state.firstName.toString()}
                        onChangeText={(firstName)=>this.setState({firstName})}
                        style={[styles.textInput,{marginTop:20}]}
                        autoCapitalize='none'
                        onSubmitEditing={()=>this.refs.lastName.focus()}
                    ></TextInput>
                    <TextInput
                        ref='lastName'
                        placeholder='Last Name'
                        value={this.state.lastName.toString()}
                        onChangeText={(lastName)=>this.setState({lastName})}
                        style={[styles.textInput,{marginTop:20}]}
                        autoCapitalize='none'
                        onSubmitEditing={()=>this.refs.apartmentNumber.focus()}
                    ></TextInput>
                    <TextInput
                        ref='apartmentNumber'
                        placeholder='House or Apartment Number'
                        keyboardType='number-pad'
                        value={this.state.apartmentNumber.toString()}
                        onChangeText={(apartmentNumber)=>this.setState({apartmentNumber})}
                        style={[styles.textInput,{marginTop:20}]}
                        onSubmitEditing={()=>this.refs.email.focus()}
                    ></TextInput>
                    <TextInput
                        ref='email'
                        placeholder='Email'
                        value={this.state.email.toString()}
                        keyboardType='email-address'
                        onChangeText={(email)=>this.setState({email})}
                        style={[styles.textInput,{marginTop:20}]}
                        autoCapitalize='none'
                    ></TextInput>
                    <DropDownPicker
                        items={arr}
                        containerStyle={{height: 45,borderRadius:20,marginTop:20}}
                        style={{borderTopLeftRadius:20,borderTopRightRadius:20,
                                borderBottomLeftRadius:20,borderBottomRightRadius:20}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        placeholder='Community'
                        placeholderStyle={{color:'#707070'}}
                        selectedLabelStyle={{color:'#707070'}}
                        arrowColor='#aaaaaa'
                        onChangeItem={item =>{ 
                            this.setState({community: item.value})
                            this.refs.password.focus()}    
                        }
                    />
                    <TextInput
                        ref='password'
                        placeholder='Password'
                        value={this.state.password.toString()}
                        onChangeText={(password)=>this.setState({password})}
                        secureTextEntry
                        style={[styles.textInput,{marginTop:20}]}
                        onSubmitEditing={()=>this.refs.confirmPassword.focus()}
                    ></TextInput>
                
                    <TextInput
                        ref='confirmPassword'
                        placeholder='Confirm Password'
                        value={this.state.confirmPassword.toString()}                            
                        secureTextEntry
                        onChangeText={(confirmPassword)=>this.setState({confirmPassword})}
                        style={[styles.textInput,{marginTop:20}]}
                    ></TextInput>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                        <TouchableOpacity style={{padding:5}}
                            onPress={()=>this.setState({isAgree:!this.state.isAgree})}
                        >
                        <View style={{backgroundColor:'black',padding:2,
                            width:16,height:16,
                            justifyContent:'center',alignItems:'center'}}>
                        {
                            this.state.isAgree &&
                            <Image style={{width:14,height:14}}
                                source={require('../../assets/check.png')}></Image>                            
                        }
                        </View>
                        </TouchableOpacity>
                        <Text style={{marginLeft:10,color:'#707070',fontSize:14,fontWeight:'bold'}}>
                            Agree with terms & conditions, </Text>
                        <TouchableOpacity>
                            <Text style={{color:'#0D9EDD',fontWeight:'bold',fontSize:14,textDecorationLine:'underline',marginLeft:10}}>
                                privacy policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'100%',alignItems:'center',marginTop:30}}>
                    {
                        this.state.isAgree ?
                        <TouchableOpacity style={styles.btn} onPress={()=>this.signup()}>
                            <Text style={{color:'white',fontWeight:'bold',fontSize:16,}}>Sign up</Text>
                        </TouchableOpacity>:
                        <View style={[styles.btn,{backgroundColor:'#707070'}]}>
                            <Text style={{color:'white',fontWeight:'bold',fontSize:16,}}>Sign up</Text>
                        </View>
                    }
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,paddingBottom:45}}>
                        <Text style={{fontWeight:'bold',fontSize:16,color:'#707070'}}>Already have an account? </Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                            <Text style={{color:'#0D9EDD',fontWeight:'bold',fontSize:16,textDecorationLine:'underline',marginLeft:10}}>
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
                {/* ---------------verification modal----------------- */}
                <Modal visible={this.state.verifyRequestVisible}>
                    <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                        <View style={styles.modalContent}>
                            <Text style={{fontSize:18}}>We have sent you a mail{'\n'}
                                on you registered email{'\n'}        for verification.</Text>
                            <TouchableOpacity style={[styles.btn,{marginTop:20}]} 
                                onPress={()=>{
                                    this.setState({verifyRequestVisible:false})
                                    this.props.navigation.navigate('VerifyEmail');
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