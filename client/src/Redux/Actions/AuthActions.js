import { CURRENT, FAIL, GETALLUSERS, GETONEUSER, LOGIN, LOGOUT, REGISTER } from "../ActionTypes/AuthTypes"
import axios from 'axios'
import { handleErrors } from "./ErrorActions"

const baseurl = process.env.REACT_APP_BASEURL


export const register=(newUser,navigate)=>async(dispatch)=>{
    try {

        console.log(newUser)
        
        const res = await axios.post(baseurl+"/api/user/SignUp",newUser)
        console.log(res)
        dispatch({
            type : REGISTER,
            payload : res.data
        })

        navigate('/profile')
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleErrors(element.msg))
        });
    }
}

export const login=(logedUser,navigate)=>async(dispatch)=>{
    try {
        const res = await axios.post(baseurl+'/api/user/SignIn',logedUser)
        dispatch({
            type : LOGIN,
            payload : res.data
        })
        navigate('/profile')
    } catch (error) {
        dispatch({
            type : FAIL,
            payload : error.response.data.errors
        })
    }
}

export const current=()=>async(dispatch)=>{
    try {
        console.log(localStorage.getItem('token'))
        const config = {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }
        const res = await axios.get(baseurl+'/api/user/getCurrentUser',config)

        dispatch({
            type : CURRENT,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : FAIL,
            payload : error.response.data.errors
        })
    }
}

export const logout=()=>{
    return(
        {
            type : LOGOUT
        }
    )
}



export const getAllUsers=()=>async(dispatch)=>{
    try {
       
        const res = await axios.get(baseurl+"/api/users/getUsers")

        dispatch(
            {
                type : GETALLUSERS,
                payload : res.data.users
            }
        )
    } catch (error) {
        dispatch({
            type : FAIL,
            payload : error.response.data.errors
        })
    }
}




export const getOneUser =(id)=> async (dispatch)=>{
    const config = {
                headers : {
                    Autorization : localStorage.getItem('token')
                }
            }
        try {
            const res = await axios.get(baseurl+'/api/user/getOneUser/'+id,config)
            dispatch({type : GETONEUSER, payload : res.data.oneUser })
        } catch (error) {
            console.log(error)
        }
}

export const updateUser =(upUser,id,navigate) =>async(dispatch) => {
   await axios.put(baseurl+`/api/users/updateUser/${id}`,upUser)
try {

    dispatch(getAllUsers())

    navigate('/ListUsers')


} catch (error) {
    console.log(error)
}
}


export const deleteUser=(id)=> async (dispatch)=>{
   
    try {

        await axios.delete(baseurl+`/api/users/deleteUser/${id}`)

        dispatch(getAllUsers())
        
    } catch (error) {
        console.log(error)
    }
}
        
        
      //update Profil

      export const updateProfile =(upUser,id,navigate) =>async(dispatch) => {
        await axios.put(baseurl+`/api/users/updateUser/${id}`,upUser)
     try {
     
         dispatch(current())
     
         navigate('/Profile')
     
     
     } catch (error) {
         console.log(error)
     }
     }


     //Delete Profile

     export const deleteProfile=(id,navigate)=> async (dispatch)=>{
   
        try {
    
            await axios.delete(baseurl+`/api/users/deleteUser/${id}`)
    
            dispatch(logout())
            navigate('/')
            
        } catch (error) {
            console.log(error)
        }
    }