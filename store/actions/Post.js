export const SET_POST='SET_POST';

 export const fetchPost=(id)=>{
     return async (dispatch, getState) =>{
       
     const token=getState().auth.token;
     const response= await fetch(
       `https://stalgia-webserver.herokuapp.com/api/post/${id}`,
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
     dispatch({
             type:SET_POST,
             postDetails:resData   
            })
           }
          } 