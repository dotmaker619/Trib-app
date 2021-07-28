import React,{Component} from 'react';
import {Image} from 'react-native';

export default class LogoScreen extends Component{
    constructor(props){
        super(props);
    }
    async componentDidMount(){
        const that=this;
        setTimeout(
            function(){
                that.props.navigation.navigate('Login');
            },
            2000
        );
    }
    render(){
        return(
            <Image style={{width:'100%',height:'100%',paddingBottom:100}} 
                source={require('../../assets/splash.png')}>          
            </Image>
        )
    }
} 