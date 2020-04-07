export const SET_CHAPTERS='SET_CHAPTERS';
export const CREATE_CHAPTER= 'CREATE_CHAPTER';
export const UPDATE_CHAPTER= 'UPDATE_CHAPTER'

export const fetchChapters=()=>{
    return async (dispatch, getState)=>{
        
        const token=getState().auth.token
        const response=await fetch(
            'https://stalgia-webserver.herokuapp.com/api/chapters',
              { 
                method:"GET",
                headers:{
                 'Content-Type': 'application/json',
                  "Authorization":
                   `Token ${token}`
                 }
                 }
                 )
            if(!response.ok){
            throw new Error('Something went wrong!')
                  }
          const resData = await response.json();
          console.log(resData)
          //this operation are performed once the above are done!!
          dispatch({
              type:SET_CHAPTERS,
              availablechapters:resData

          })
    }
}
 export const createChapter=(title,group,start_date,end_date,creator)=>{
   return async (dispatch,getState)=>{
     const token = getState().auth.token
     const response = await fetch(
       'https://stalgia-webserver.herokuapp.com/api/chapters/',
     { 
      method:"POST",
      headers: {
       'Content-Type': 'application/json',
        "Authorization":
         `Token ${token}`
       },
       body:JSON.stringify(
        {
           title,
           group,
           start_date,
           end_date,
           creator
        }
       )
       })

       const resData = await response.json();
      //  console.log(resData)
     dispatch({
          type:CREATE_CHAPTER,
           chaptersData:{
            title,
            group,
            start_date,
            end_date,
            creator
           }
     })
   }
 }

 export const updateChapter=(id,title,start_date,end_date,creator)=>{
   return async (dispatch,getState)=>{
     const token= getState().auth.token
     const response= await fetch(
      `https://stalgia-webserver.herokuapp.com/api/chapters/${id}`,
      { 
       method:"PUT",
       headers: {
        'Content-Type': 'application/json',
         "Authorization":
          `Token ${token}`
        },
        body:JSON.stringify(
         {
            title,
            start_date,
            end_date,
            creator
         }
        )
        }
     )
     if(!response.ok){
      throw new Error("something went wrong");
     }  
      dispatch({
        type:UPDATE_CHAPTER,
         chId:id,
         chaptersData:{
          title,
          start_date,
          end_date,
          creator
         }
   })
   }
 }
