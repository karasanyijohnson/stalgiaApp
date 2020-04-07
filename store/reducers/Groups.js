import{
    CREATE_GROUP, 
    SET_GROUPS, 
    UPDATE_GROUP} from '../actions/Groups';
import Group from '../../models/group';

const initialState={
    availableGroups:[],
    // userGroups:[]
}
export default (state=initialState,action)=>{
    switch(action.type){

       case SET_GROUPS:
           return{
               availableGroups:action.availableGroups,
            //    userGroups:action.userGroups,
           }
       case CREATE_GROUP:
       const newGroup= new Group(
           action.groupData.id,
           action.groupData.title,   
       )
       return{
           ...state,
           availableGroups: state.availableGroups.concat(newGroup),
        //    userGroups:state.userGroups.concat(newGroup)
       }
       case UPDATE_GROUP:
           //finding the index of current product
        //    const groupIndex=state.userGroups.findIndex(
        //        grop =>grop.id===action.pid
        //        );
            const updatedGroup= new Group(
                action.gid,
                // state.userGroups[groupIndex].ownerId,
                action.groupData.title,
                );
            // const updatedUserGroups=[...state.userGroups];
            // updatedUserGroups[groupIndex]=updatedGroup;//replace the userGroup with new updated group
            
            const availableGroupIndex=state.availableGroups.findIndex(
                grop=>grop.id===action.gid
                );
            const updatedAvailableGroups=[...state.availableGroups];
            updatedAvailableGroups[availableGroupIndex]=updatedGroup;
            return{
                ...state,
                availableGroups:updatedAvailableGroups,
                // userGroups:updatedUserGroups,
            }
    }
    return state
}