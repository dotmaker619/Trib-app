import React,{Component } from 'react'
import {View, Text,TouchableOpacity,ScrollView,Image} from 'react-native';
import { Modal } from 'react-native-paper';
import styles from './styles';
export default class DropDownPicker extends Component{
    constructor(props){
        super(props);
        this.state={
            expand:false,
        }
    }
    render(){
        return(
            <View style={{width:'100%'}}>
                <TouchableOpacity onPress={()=>this.setState({expand:!this.state.expand})}
                    style={styles.DropDownPicker}>
                    <Text style={{color:'#aaaaaa',fontSize:16,fontWeight:'bold'}}>{this.props.value}</Text>
                    {
                        this.state.expand ?
                        <Image style={{width:18,height:18,}} source={require('../assets/arrow-up.png')}></Image>:
                        <Image style={{width:18,height:18}}  source={require('../assets/arrow-down.png')}></Image>                   
                    }
                </TouchableOpacity>
                <Modal visible={this.state.expand}>
                    <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                        <View style={{backgroundColor:'white',maxHeight:130,paddingBottom:10,paddingLeft:20,paddingBottom:10}}> 
                            <ScrollView style={{maxHeight:150}}>
                            {
                                this.props.items.map((value,key)=>{
                                    return(
                                        <TouchableOpacity  key={key} onPress={()=>{
                                            this.props.onItemClick(value,key);
                                            this.setState({expand:false})
                                        }}
                                            style={{marginTop:10}}>
                                            <Text style={{color:'#aaaaaa',fontWeight:'bold',fontSize:16,}}>{value}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}