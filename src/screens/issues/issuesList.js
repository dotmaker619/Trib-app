import React,{Component} from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import styles from '../styles'

export default class IssuesList extends Component{
    constructor(props){
        super(props)
        this.state={
            commnityId:'5f969d104295fb69ac1299bd',
            issues:[],
            selectedTab:'Personal'
        }
        global.width=Dimensions.get('window').width;
        global.height=Dimensions.get('window').height;
    }
    async componentDidMount(){
    }

    render(){
        let offeringColor='#aaaaaa'
        let requestsColor='#aaaaaa'
        switch(this.state.selectedTab){
            case 'Personal':offeringColor='#000';break;
            case 'Common':requestsColor='#000';break;
        }
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Issues</Text>
                    <Image style={styles.roundImage}></Image>
                </View>
                <View style={styles.subContainer}>
                   <Text style={{fontWeight:'bold'}}>Community Name</Text>
                   <View style={{flexDirection:'row',marginTop:20}}>
                        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>this.setState({selectedTab:'Personal'})}>
                            <Text style={{color:offeringColor}}>Personal</Text>
                            <View style={[styles.line,{backgroundColor:offeringColor}]}></View>    
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>this.setState({selectedTab:'Common'})}>
                            <Text style={{color:requestsColor}}>Common</Text>
                            <View style={[styles.line,{backgroundColor:requestsColor}]}></View>    
                        </TouchableOpacity>
                   </View>
                   <ScrollView style={{marginTop:10}}>
                    {
                        this.state.issues.map((value,key)=>{
                            return(
                                <View key={key} style={{paddingTop:20}}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.roundImage} ></Image>
                                        <View style={{marginLeft:20}}>
                                            <Text>{'Sam moore'}</Text>
                                            <Text style={{color:'#707070',fontSize:12}}>
                                                {moment(value.createDate).format('DD')}th {moment(value.createDate).format('MMM YYYY')}
                                            </Text>
                                        </View>
                                    </View>

                                    <Image 
                                        style={{marginTop:10,borderRadius:10,width:'100%',height:150,
                                        borderRadius:10,backgroundColor:'#dddddd'}}
                                        ></Image>

                                    {
                                        this.state.selectedTab=='Common' &&
                                        <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'flex-end'}}>
                                            <TouchableOpacity style={{borderWidth:1,borderRadius:20,padding:5,paddingHorizontal:30,borderColor:'#0D9EDD'}}>
                                                <Text style={{color:'#0D9EDD',fontWeight:'bold'}}>Reject</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:10,borderRadius:20,padding:5,paddingHorizontal:30,backgroundColor:'#0D9EDD'}}>
                                                <Text style={{color:'white',fontWeight:'bold'}}>Accept</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <View style={styles.line} ></View>
                                </View>
                            )
                        })
                    }
                        <View style={{height:180}}></View>
                   </ScrollView>
                   <TouchableOpacity style={[styles.plusButton,{
                        marginTop:global.height-280,
                        marginLeft:global.width-70,}]}>
                        <Image style={styles.image60} source={require('../../assets/plus.png')}></Image>
                   </TouchableOpacity>
                </View>
            </View>
        )
    }
}