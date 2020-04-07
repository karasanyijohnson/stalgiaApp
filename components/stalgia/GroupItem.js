import React from 'react'
import {
  View,
  Text, 
  StyleSheet,
  TouchableNativeFeedback, 
  TouchableOpacity,
  Platform
} from 'react-native'
import Card from '../users/Card'

const GroupItem= props=>{
   
  let TouchableCmp= TouchableOpacity;
    if(Platform.OS==='android'&& Platform.Version >=21){
        TouchableCmp=TouchableNativeFeedback
    }
    return(
        <Card style={styles.Group}>
          <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={styles.Details}>
          <Text>{props.title}</Text>
          </View>
          </TouchableCmp>
        </Card>
       )
}
const styles =StyleSheet.create({
Group:{
    height:300,
    margin:20,
},
Details:{
    alignItems:'center',
    height:'17%',
    padding:10
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'23%',
        paddingHorizontal:20
        }        
})
export default GroupItem
