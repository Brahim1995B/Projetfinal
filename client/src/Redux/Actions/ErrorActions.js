import { CLEARERRORS, HANDLEERRORS } from "../ActionTypes/ErrorTypes"

export const handleErrors=(msg)=>(dispatch)=>{
    const id = Math.random()

    dispatch({
        type : HANDLEERRORS,
        payload : {msg,id}
    })

    setTimeout(() => {
        dispatch({
            type : CLEARERRORS,
            payload : id
        })
    }, 3000);
}