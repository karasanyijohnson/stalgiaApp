import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const AddNewPost = props => {
    return(
        <View style={styles.container}>
            <Text>Add New Post</Text>
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default AddNewPost;