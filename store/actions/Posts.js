export const SET_POSTS='SET_POSTS';

 export const fetchPosts=(id)=>{
     return async (dispatch, getState) =>{
       
     const token=getState().auth.token;
     const response= await fetch(
       `https://stalgia-webserver.herokuapp.com/api/posts/${id}`,
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
     const resData= await response.json();
     console.log(resData)
    //  console.log(resData +"post")        
     dispatch({
             type:SET_POSTS,
             chapterPosts:resData   
            })
           }
          } 