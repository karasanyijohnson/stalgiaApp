import React,{useState, useEffect,useCallback} from'react';
import {View,TextInput,Text, StyleSheet,Platform} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux'

import HeaderButton from '../../components/users/HeaderButton'
import *as groupActions from '../../store/actions/Groups'

const AddNewGroupScreen = props =>{

    const groupId=props.navigation.getParam('groupId')
    const editedGroup= useSelector(
        state=>state.groups.availableGroups.find(grop=>grop.id===groupId))
    const [title, setTitle]= useState(editedGroup?editedGroup.title:'')

    const dispatch= useDispatch()

    const submitHandler= useCallback(()=>{
        // console.log('submitting')
        if(editedGroup){
            
            dispatch(groupActions.updateGroup(groupId,title))//forwarded data that we want to update
        }
        else{
            dispatch(groupActions.createGroup(title))
        }
        props.navigation.goBack()
        
    },[dispatch,groupId,title])

    useEffect(()=>{
      props.navigation.setParams({submit:submitHandler})
    },[submitHandler])

    return(
        <View style={styles.container}>
             <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
            style={styles.input} 
            value={title} 
            onChangeText={text=>setTitle(text)}
            />
        </View>
        </View>   
    )
}

AddNewGroupScreen.navigationOptions=navData=>{
    const submitFn=navData.navigation.getParam('submit')
return{
    headerTitle:navData.navigation.getParam('groupId')
    ? 'Edit Group'
     :'Add Group',
     headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item
           title='Save'
           iconName={Platform.OS==='android'?'md-checkmark':'ios-checkmark'}
           onPress={submitFn}
         />
     </HeaderButtons>
}
}
const styles =StyleSheet.create({
    container:{
       flex:1
    },
formControl:{
    width:'100%'
} ,
label:{
    fontFamily:'open-sans-bold',
    marginVertical:8
},
input:{
    paddingHorizontal:2,
    paddingVertical:5,
    borderBottomColor:'#ccc',
    borderBottomWidth:1
}  

})
export default AddNewGroupScreen;
