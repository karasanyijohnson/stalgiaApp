import React,{useCallback, useEffect} from 'react';
import{View,StyleSheet,Button,FlatList,Text, TouchableOpacity, ScrollView} from 'react-native';
import{useSelector,useDispatch} from 'react-redux'

import *as GroupActions from '../../store/actions/Groups'
import *as chapterActions from '../../store/actions/Chapters'
const GroupAndChaptersScreen=props=>{
    
    const availableGroups= useSelector(state=>state.groups.availableGroups)
    const availableChapters= useSelector(state=>state.chapters.availableChapters)
    const dispatch =useDispatch()
      useEffect(()=>{
         dispatch(GroupActions.fetchGroup())
      },[dispatch])

      useEffect(()=>{
        dispatch(chapterActions.fetchChapters())
     },[dispatch])

    const selectedGroupHandler = (id,title) => {
      props.navigation.navigate('groupScreen',{
      groupId:id,
      groupTitle:title
      })
     }  
     
     const selectedChapterHandler = (id,title) => {
        props.navigation.navigate('chapterScreen',{
        chapterId:id,
        chapTitle:title
        })
       }  
    return(
        <View style={styles.container} >
            <View style={styles.groupFlatList}>
             <FlatList
             data={availableGroups}
             keyExtractor={item =>item.id.toString()}
             renderItem={itemData=>(
                <ScrollView>
                <TouchableOpacity 
                 onPress={()=>{
                    selectedGroupHandler(itemData.item.id, itemData.item.title)
                }}>
                <View style={styles.group}>
                 <Text >{itemData.item.title}</Text>
                 </View>
              </TouchableOpacity>
              </ScrollView>
            )}
            />
            </View>
            <View style={styles.editButton}>
                <Button title='New group'
                  onPress={()=>{
                      props.navigation.navigate('newGroup')
                  }}
                />
            </View>
            <View style={styles.groupFlatList}>
             <FlatList
             data={availableChapters}
             keyExtractor={item =>item.id.toString()}
             renderItem={itemData=>(
                <ScrollView>
                <TouchableOpacity 
                 onPress={()=>{
                    selectedChapterHandler(itemData.item.id, itemData.item.title)
                }}>
                <View style={styles.group}>
                 <Text >{itemData.item.title}</Text>
                 </View>
              </TouchableOpacity>
              </ScrollView>
            )}
            />
            </View>
            <View style={styles.editButton}>
                <Button title='New chapter'
                  onPress={()=>{
                      props.navigation.navigate('newChapter')
                  }}
                />
            </View>
        </View>
    )
}
GroupAndChaptersScreen.navigationOptions={
    headerTitle:'groups and chapters'
}
const styles=StyleSheet.create({
 container:{
     flex:1,
    },
    groupFlatList:{
     width:'95%',   
     height:'35%',
     backgroundColor:'white',
     marginTop:20
    },
 editButton:{
    width:'40%',
     marginTop:10,
     marginHorizontal:20
 },
 group:{
     marginVertical:3,
     backgroundColor:'#ccc'
 }
})

export default GroupAndChaptersScreen;