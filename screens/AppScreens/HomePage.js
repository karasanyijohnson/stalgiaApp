import React,{useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView, 
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  requireNativeComponent} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import{useDispatch,useSelector} from 'react-redux'

import *as chaptersActions from '../../store/actions/Chapters'
const HomeScreen= props =>{
  const availableChapters= useSelector(state=>state.chapters.availableChapters)
  const dispatch =useDispatch()
  
  useEffect(()=>{
     dispatch(chaptersActions.fetchChapters())
  },[dispatch])

  const selectedChapterFeedHandler=(id,title)=>{
    props.navigation.navigate('chapterFeed',{
     chapterTitle:title,
     chapIdFeed:id,
     }
    )
  }
    return(
      <View style={styles.container}>
     <FlatList
      data={availableChapters}
      keyExtractor={item=>item.id.toString()}
      renderItem={iteData=>(
        <ScrollView>
        <View style={styles.chaptersView}>
          <TouchableOpacity 
           onPress={()=>{
           selectedChapterFeedHandler(iteData.item.id,iteData.item.title)
          }}>
          <View style={styles.chapter}>
          <View style={styles.detail}>
          <Text style={styles.creator}>{iteData.item.title}</Text>
           <Text style={styles.creator}>{iteData.item.creator}</Text>
          <View style={styles.dates}>
          <Text>{iteData.item.start_date}</Text>
          <Text style={{marginHorizontal:8}}>{iteData.item.end_date}</Text>
          </View>
          </View>
          <View style={styles.image}>
            {
              iteData.item.images.length > 0 ? 
              <Image source={{uri:iteData.item.images[0].media_url}} style={{width:"100%", height:"100%"}}/>:
              <Image source={require('../../assets/no-image.jpg')} style={{width:"100%", height:"100%"}}/>
            }
          
          </View>
        </View>
        </TouchableOpacity>
        </View>
        </ScrollView>
      )}
      >
      </FlatList>
      <View style={styles.add}>
      <AntDesign 
      name="pluscircleo" 
      size={32} color="black"
       onPress={()=>{
           props.navigation.navigate('group')
         }}
      />  
      </View>
      </View>
       )
    }
HomeScreen.navigationOptions={
    headerTitle: 'MY CHAPTERS' 
  }
const styles= StyleSheet.create({
  container:{
    flex:1
  },
  creator:{
    fontSize:18
  },
  chapter:{
    width:'100%',
    height:150,
    backgroundColor:'white',
    flexDirection:'row',
    marginVertical:5
  },
  chaptersView:{
   height:'80%',
  },
 detail:{
   width:'60%'
 },
 dates:{
 flexDirection:'row',
 },
 image:{
   height:140,
   width:"35%",
  
 },
add:{
  marginHorizontal:'40%'
}
})
export default HomeScreen;