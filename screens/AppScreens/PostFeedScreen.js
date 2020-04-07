import React,{useEffect} from 'react';
import {View,Text,StyleSheet,FlatList, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {FontAwesome} from '@expo/vector-icons'

import *as postActions from '../../store/actions/Post'


const PostFeedScreen =props=>{
    const postDetails = useSelector(state=>state.post.postDetails)
    const medias= postDetails.media_set
    const postId= props.navigation.getParam('postId')
    const postFeeds=useSelector(state=>state.posts.chapterPosts.find(feed=>feed.id===postId))

    const dispatch= useDispatch()
    useEffect(()=>{
     dispatch(postActions.fetchPost(postId))
    },[dispatch])
    // const media = chapterFeed.media_set
    // console.log(chapterFeed+"\n yes it worked")
    return(
        <View style={styles.container}>
           <View style={styles.container1}>
            <Text>{postFeeds.title}</Text>
            <Text>{postFeeds.event_date}</Text>
           </View>
           <View style={styles.container2}>
           <View>
           <Text>Tagged People</Text>
            <FontAwesome
             name='eye'
             size={32}
             onPress={()=>{
             }}
            />
          </View>
          <View style={styles.song}>
            <Text>song here</Text>
            </View>
           </View>
             <View style={{ height:400, width:400 }}>
               <FlatList 
               data={medias}
               keyExtractor={item=>item.id}
               renderItem={itemData=>(
               <View style={{width:'100%', height:200, }}>
                    <Image source={{uri:itemData.item.media_url}} style={{width:'100%', height:'80%'}}/>
                    <Text>{itemData.item.name}</Text>
               </View>
                )}
               >  
               </FlatList>
           </View>
         <View style={styles.description}>
          <Text>{postFeeds.description}</Text>
          </View>
        </View>
        )
    }

PostFeedScreen.navigationOptions=(navData)=>{
    return{
        headerTitle:navData.navigation.getParam('postCreator')
        }
       }
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    container1:{
       justifyContent:'center',
       alignItems:'center' ,
    },
    container2:{
        height:100,
        backgroundColor:'grey',
        marginHorizontal:7,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    song:{
    backgroundColor:'green',
    height:'80%',
    width:150,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center'
    },
    medians:{
        height:300,
        marginVertical:5,
        backgroundColor:'grey',
        marginHorizontal:3
    },
    media:{
        height:'48%',
        marginVertical:3,
        backgroundColor:'purple',
    
    },
    description:{
        justifyContent:'center',
        alignItems:'center'
    }
})
export default PostFeedScreen