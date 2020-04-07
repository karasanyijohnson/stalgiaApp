export const CREATE_GROUP='CREATE_GROUP';
export const UPDATE_GROUP='UPDATE_GROUP';
export const SET_GROUPS= 'SET_GROUPS'

export const fetchGroup=()=>{
  return async (dispatch,getState) => {
    console.log(getState())
    const token=getState().auth.token
    console.log("this is the token:"+token)
    //any async code you want!!
    try{
        const response= await fetch(
            'https://stalgia-webserver.herokuapp.com/api/groups/',
           { 
           method:"GET",
           headers: {
            'Content-Type': 'application/json',
             "Authorization":
              `Token ${token}`
            }
            }

            );
        if(!response.ok){
          console.log(resData)
            throw new Error('Something went wrong!')
        }
        const resData = await response.json();
        console.log(resData)
    dispatch({
        type:SET_GROUPS,
        availableGroups:resData.member_of, 
        userGroups:resData.member_of,
      }); 

    }catch(err){
      console.log(err)
        //send to custom analytics server
     throw err
    }

  }  
}
export const createGroup=(title)=>{
    return async (dispatch, getState)=>{
        //console.log(getState());
        const token = getState().auth.token;
        const response  = await fetch(`https://stalgia-webserver.herokuapp.com/api/groups/`,
        {
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
               "Authorization":
                `Token ${token}`
              },
              //JSON.stringify is used to turn js object or array into JSON format
            body: JSON.stringify({
              title,
            })
          });
 
          const resData= await response.json();
          console.log(resData)
// for creating product locally if request is successiful
     dispatch({
         type:CREATE_GROUP,
         groupData:{
         id:resData.id, 
         title,  
      }
    });
    }
}

export const updateGroup= (id,title) => {
  return async (dispatch,getState) => {
     const token= getState().auth.token
   const response = await fetch(
    `https://stalgia-webserver.herokuapp.com/api/groups/${id}`,
          {
          method:'PUT',
          headers:{
            'Content-Type': 'application/json',
             "Authorization":
              `Token ${token}`
            },
          body:JSON.stringify({
              id,
              title,
              })
          });

        if(!response.ok){
            throw new Error("something went wrong");
        }  
        
      dispatch({
              type:UPDATE_GROUP,
              gid:id,
              groupData:{
                  title,
                  }
          })
       }
     }