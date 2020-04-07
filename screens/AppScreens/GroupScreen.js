import React from 'react';
import{View,StyleSheet,Button,FlatList,Text,ScrollView} from 'react-native';
import {useSelector} from 'react-redux'

import Colors from '../../constants/Colors'


const GroupScreen = props => {
    const groupId=props.navigation.getParam('groupId')
    const selectedGroup=useSelector(state=>
        state.groups.availableGroups.find(grop=>grop.id===groupId))

    const availableChaptersInGroup= useSelector(state=>state.chapters.availableChapters)
    console.log(availableChaptersInGroup)

    const editGroupHandler=(id)=>{
    props.navigation.navigate('newGroup',{groupId:id})
           } 
    const createCHapter=()=>{
        props.navigation.navigate('newChapter')
                  }           
    return(
        <View style={styles.container} >
           <View style={styles.groupFlatList}>
           <View style={{backgroundColor:'grey',marginVertical:20}}>
           <View style={{marginVertical:10}}>
           <FlatList 
            data={availableChaptersInGroup}
            keyExtractor={item=>item.id.toString()}
            renderItem={itemData=>
             <ScrollView>
                <View style={{marginVertical:5}}>
               {/* <Text> {itemData.item.title}</Text> */}
              </View>
             </ScrollView>
            }
            >
            </FlatList>
           </View>
            <View style={styles.editChapter}>
            <Button 
            title='Create chapter' 
            color={Colors.accent}
            onPress={()=>{
                createCHapter()
            }}
            />  
            </View>
           </View>
           <View style={styles.editGroup}>
            <Button 
            title='Edit group' 
            color={Colors.accent}
            onPress={()=>{
                editGroupHandler(selectedGroup.id)
            }}
            /> 
            </View> 
            </View>
        </View>
    )
}
GroupScreen.navigationOptions=navData=>{
   return{
       headerTitle:navData.navigation.getParam('groupTitle')
    }
}
const styles=StyleSheet.create({
 container:{
     flex:1,
    },
    groupFlatList:{
     height:'70%',
     backgroundColor:'white'
    },
 editChapter:{
     width:'45%',
     margin:20,
     },
     editGroup:{
         width:'45%',
         margin:20
     }
})

export default GroupScreen;