import {SET_POST} from '../actions/Post';

const initialState={
    postDetails:[]
}
export default(state=initialState,action)=>{
    switch(action.type){
        case SET_POST:
            return {
                postDetails:action.postDetails
            }
    default:
    return state
    }
}