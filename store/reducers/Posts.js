import {SET_POSTS} from '../actions/Posts';
const initialState={
    chapterPosts:[]
}
export default(state=initialState,action)=>{
    switch(action.type){
        case SET_POSTS:
            return {
                chapterPosts:action.chapterPosts
            }
    default:
    return state
    }
}