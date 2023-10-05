import { CLEARERRORS, HANDLEERRORS } from "../ActionTypes/ErrorTypes"

const initialState = []

const ErrorReducer=(state = initialState,action)=>{
    switch (action.type) {
        case HANDLEERRORS : return [...state,action.payload]
        case CLEARERRORS : return state.filter(el => el.id != action.payload)
        default: return state
    }
}

export default ErrorReducer