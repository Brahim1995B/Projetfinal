import { Navigate, useNavigate } from "react-router-dom"

export default function Deconnexion (){
    localStorage.clear()
   return <Navigate replace to="/" />
}