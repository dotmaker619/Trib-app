import {createAppContainer,} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import logoScreen from '../screens/member/splash';
import loginScreen from '../screens/member/login';
import signupScreen from '../screens/member/signup'
import forgotPasswordScreen from '../screens/member/forgotPassword'
import verifyEmailScreen from '../screens/member/verifyEmail'
import verifyEmailForgotScreen from '../screens/member/verifyEmailForgot'
import resetPasswordScreen from '../screens/member/resetPassword'
import materialBottomTabNavigator from './materialBottomTabNavigator';
const naviator=createStackNavigator({
    Logo:{
        screen:logoScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    Login:{
        screen:loginScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    Signup:{
        screen:signupScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    ForgotPassword:{
        screen:forgotPasswordScreen,
        navigationOptions:{
            title:''
        }
    },
    VerifyEmail:{
        screen:verifyEmailScreen,
        navigationOptions:{
            title:''
        }
    },
    VerifyEmailForgot:{
        screen:verifyEmailForgotScreen,
        navigationOptions:{
            title:''
        }
    },

    ResetPassword:{
        screen:resetPasswordScreen,
        navigationOptions:{
            title:''
        }
    },
    MaterialBottomTabNavigator:{
        screen:materialBottomTabNavigator,
        navigationOptions:{
            headerShown:false
        }
    }
});
export default createAppContainer(naviator);