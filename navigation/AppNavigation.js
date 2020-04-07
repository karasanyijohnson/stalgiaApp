
import{createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';




import Colors from '../constants/Colors';
import HomePage from '../screens/AppScreens/HomePage';
import LoginScreen from '../screens/users/LoginScreen';
import SignUpScreen from '../screens/users/SignUpScreen'
import GroupAndChaptersScreen from '../screens/AppScreens/GroupAndChaptersScreen';
import GroupScreen from '../screens/AppScreens/GroupScreen';
import ChapterFeedScreen from '../screens/AppScreens/ChapterFeedScreen';
import PostFeedScreen from '../screens/AppScreens/PostFeedScreen';
import AddNewGroup from '../screens/users/AddNewGroup'
import AddNewChapter from '../screens/users/AddNewChapter'
import chapterScreen from '../screens/AppScreens/ChapterScreen';
import AddNewPost from '../screens/users/AddNewPost'


const defaultNavOptions = {
    headerStyle:{
        backgroundColor: Platform.OS==='android' ? Colors.primary:''
    },
    headerTitleStyle:{
       fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans'
     },
    headerTintColor: Platform.OS==='android'? 'white':Colors.primary
} 

const HomeNavigator = createStackNavigator({
    home: HomePage,
    group:GroupAndChaptersScreen,
    groupScreen:GroupScreen,
    chapterScreen:chapterScreen,
    newGroup:AddNewGroup,
    newChapter:AddNewChapter,
    chapterFeed: ChapterFeedScreen,
    postFeed:PostFeedScreen,
    createPost:AddNewPost
},{
    defaultNavigationOptions:defaultNavOptions
})

const AuthNavigator =createStackNavigator({
    login:LoginScreen,
    signUp:SignUpScreen

},{
    defaultNavigationOptions:defaultNavOptions
})

const MainNavigator = createSwitchNavigator({  
auth:AuthNavigator,
home: HomeNavigator,

})
export default createAppContainer(MainNavigator)
