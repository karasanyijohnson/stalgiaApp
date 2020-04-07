import Chapter from '../../models/chapter'
import{SET_CHAPTERS, CREATE_CHAPTERS, UPDATE_CHAPTER}from '../actions/Chapters';

const initialState={
    availableChapters:[],
    // userChapters:[],
}
export default(state=initialState,action)=>{
    switch(action.type){
         case SET_CHAPTERS:
             return{
                 availableChapters:action.availablechapters,
                //  userChapters:action.userChapters
             }
          case CREATE_CHAPTERS:
              const newChapter= new Chapter(
                   action.chaptersData.title,
                   action.chaptersData.creator,
                   action.chaptersData.start_date,
                   action.chaptersData.end_date
              )
              return {
                  ...state,
                  availableChapters:state.availableChapters.concat(newChapter)
              }
             case UPDATE_CHAPTER:
                  const updatedChapter= new Chapter(
                      action.chId,
                      action.chaptersData.title,
                      action.chaptersData.creator,
                      action.chaptersData.start_date,
                      action.chaptersData.end_date
                  )
                  const availableChapterIndex=state.availableChapters.findIndex(
                    chap=>chap.id===action.chId
                    );
                const updatedAvailableChapters=[...state.availableChapters];
                updatedAvailableChapters[availableChapterIndex]=updatedChapter;
                return{
                    ...state,
                    availableChapters:updatedAvailableChapters,
                    // userGroups:updatedUserGroups,
                }
        
          default:
            return state   
    }
}