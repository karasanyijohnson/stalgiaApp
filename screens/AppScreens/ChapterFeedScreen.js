import React,{useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,FlatList,Platform,TouchableOpacity,Image,ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux';
import *as postActions from '../../store/actions/Posts'

import HeaderButton from '../../components/users/HeaderButton'

const ChapterFeedScreen = props =>{
    const chapId= props.navigation.getParam('chapIdFeed')
    const chapterFeed = useSelector(state=>state.posts.chapterPosts)
    const selectedChapFeed=useSelector(state=>
        state.chapters.availableChapters.find(chapFeed=>chapFeed.id===chapId))
    const dispatch= useDispatch()
   useEffect(()=>{
       dispatch(postActions.fetchPosts(chapId))
   },[dispatch])

   const selectedPost=(id)=>{
       props.navigation.navigate('postFeed',{
           postId:id,
           postCreator:selectedChapFeed.creator
       })
   }
   if(chapterFeed.length===0){
    return<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text>No post found, you may create some!!</Text>
    </View>
   }

    return(
        <View style={styles.container}>
            <View style={styles.dates}>
            <Text>{selectedChapFeed.start_date}</Text>
            <Text style={{marginLeft:10}}>{selectedChapFeed.end_date}</Text>
            </View>
            <View style={styles.posts}>
            <FlatList
            data={chapterFeed}
            keyExtractor={item=>item.id.toString()}
            renderItem={itemData=>(
                <ScrollView>
                 <TouchableOpacity 
                 onPress={()=>{
                     selectedPost(itemData.item.id,)
                    //  {console.log(chapterFeed)}
                 }}
                >
                <View style={styles.post}>
                 <View style={styles.image}>
                    <Image source={{uri:itemData.item.media_set[0].media_url}}
                     style={{width:"100%", height:'100%'}} 
                     />
                 </View>
                <View style={{flexDirection:'row'}}>
                <Text>{selectedChapFeed.creator}</Text>
                <Text style={{marginLeft:10}}>{itemData.item.event_date}</Text>
                </View>
                <Text>{itemData.item.title}</Text>  
                </View>
                </TouchableOpacity>
                </ScrollView>
                )}
            >
            </FlatList>
            </View>
        </View>
    )
}
ChapterFeedScreen.navigationOptions=navData=>{
    return {
      headerTitle:navData.navigation.getParam('chapterTitle'),
      headerRight:()=><HeaderButtons HeaderButtonComponent ={HeaderButton}>
                      <Item
                       title='Add'
                       iconName={Platform.OS==='android'?'md-add':'ios-add'}
                       onPress={()=>
                           navData.navigation.navigate('createPost')
                       }
                      />
                      </HeaderButtons>
                     }
                    }
const styles= StyleSheet.create({
     container:{
         flex:1,
     },
     dates:{
        flexDirection:'row',
        marginHorizontal:10,
        justifyContent:'center',
     },
      posts:{
       height:'90%',
       width:'95%',
       backgroundColor:'white',
       margin:10
    },
    post:{
        width:'100%',
        height:250,
        backgroundColor:'grey'
    },
    image:{
       width:'100%',
       height:'80%' ,
    //    backgroundColor:'black'
    }
    }
)
export default ChapterFeedScreen