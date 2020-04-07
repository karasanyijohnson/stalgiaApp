import React,{useState, useEffect,useCallback} from'react';
import {View,TextInput,Text, StyleSheet,Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux'

import HeaderButton from '../../components/users/HeaderButton'
import *as chaptersActions from '../../store/actions/Chapters'

const AddNewChapterScreen = props =>{

    const chapterId=props.navigation.getParam('chapterId')
    const editedChapter= useSelector(
        state=>state.chapters.availableChapters.find(chap=>chap.id===chapterId))
    const [title, setTitle]= useState(editedChapter?editedChapter.title:'')
    const [group, setGroup]= useState(editedChapter?editedChapter.group:'')
    const [creator, setCreator]= useState(editedChapter?editedChapter.creator:'')
    const [start_date, setStart_date]= useState(editedChapter?editedChapter.start_date:'')
    const [end_date, setEnd_date] = useState(editedChapter?editedChapter.end_date:'')

    const dispatch= useDispatch()

    const submitHandler= useCallback(()=>{
        if(editedChapter){
            dispatch(chaptersActions.updateChapter(chapterId,title,start_date,end_date,creator))//forwarded data that we want to update
        }
        else{
            dispatch(chaptersActions.createChapter(title,group,start_date,end_date,creator))
        }
        props.navigation.goBack()
    },[chapterId,title,start_date,end_date,creator,group])

    useEffect(()=>{
      props.navigation.setParams({submit:submitHandler})
    },[submitHandler])

    return(
            <KeyboardAvoidingView 
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.container}
            >
                <ScrollView>
             <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
            style={styles.input} 
            value={title} 
            onChangeText={text=>setTitle(text)}
            />
        </View>
        <View style={styles.formControl}>
            <Text style={styles.label}>creator</Text>
            <TextInput 
            style={styles.input} 
            value={creator} 
            onChangeText={text=>setCreator(text)}
            />
        </View>
        {editedChapter?null:(
        <View style={styles.formControl}>
        <Text style={styles.label}>group</Text>
        <TextInput 
        style={styles.input} 
        value={group} 
        onChangeText={text=>setGroup(text)}
        />
        </View>
        )}
       
        <View style={styles.formControl}>
            <Text style={styles.label}>start_date</Text>
            <TextInput 
            style={styles.input} 
            value={start_date} 
            onChangeText={text=>setStart_date(text)}
            />
        </View>
        <View style={styles.formControl}>
            <Text style={styles.label}>end_date</Text>
            <TextInput 
            style={styles.input} 
            value={end_date} 
            onChangeText={text=>setEnd_date(text)}
            />
        </View>
        </ScrollView>
        </KeyboardAvoidingView> 
    )
}

AddNewChapterScreen.navigationOptions=navData=>{
    const submitFn=navData.navigation.getParam('submit')
return{
    headerTitle:navData.navigation.getParam('chapterId')
    ? 'Edit chapter'
     :'create chapter',
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
export default AddNewChapterScreen;
