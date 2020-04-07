import React from 'react';
import {View,Text,StyleSheet,Button} from 'react-native'
import {useSelector} from 'react-redux'

import Colors from '../../constants/Colors'
const chapterScreen=props=>{

    const chapterId=props.navigation.getParam('chapterId')
    const selectedChapter=useSelector(state=>
        state.chapters.availableChapters.find(chap=>chap.id===chapterId))

    const editChapterHandler=(id)=>{
    props.navigation.navigate('newChapter',{chapterId:id})
           }  
    return(
            <View style={styles.container} >
                <View style={styles.groupFlatList}>
                <View style={styles.editButton}>
                <Button 
                title='Edit Chapter' 
                color={Colors.accent}
                 onPress={()=>{
                    editChapterHandler(selectedChapter.id)
                }}
                />  
                </View>
                </View>
            </View>
          )
          }
chapterScreen.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam('chapTitle')
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
       },
       groupFlatList:{
        height:'50%',
        backgroundColor:'white'
       },
    editButton:{
       width:'40%',
        marginTop:200,
        marginHorizontal:20
    }
   })
export default chapterScreen