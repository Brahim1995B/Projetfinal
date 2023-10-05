import react from 'react'
import  carImage from "../../assets/images/car1.png"
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteCar } from '../../Redux/Actions/PostActions';
export default function CardCar (props){
    const {car} = props
    console.log(car)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carDelete =()=>{
        dispatch(deleteCar(car._id,navigate,"/profile"))
    }

    return(
        <div  className="card" style={{position:"relative"}}>
            <IconButton onClick={()=>carDelete()} style={{position:"absolute",right:0,top:0}}>
                <DeleteIcon  style={{color:"red"}}/>
            </IconButton>
                            <a ><img src={car.image[0]} className="card-img-top" /></a>
                            <div onClick={()=>navigate('/car/'+car._id)} className="card-body p-4">
                                <a >
                                    <h4 className="card-title">{car.marque+ " " + car.model}</h4>
                                </a>
                                <div className="card-text ">
                                    <ul style={{display:"inline-block"}}>
                                        <li className="ml-3">
                                          Puissance :   {car.puissanceF+"CV"}
                                        </li>
                                        
                                        <li className="ml-3"> Kilometrage : {car.kilometrage}</li>
                                       
                                        <li className="ml-3">Annee : {car.annee} </li>
                                        
                                        <li className="ml-3">Carburant  {car.carburant}</li>
                                    </ul>
                                </div>
                                <hr/>
                                <div className="d-flex justify-content-between">
                                    <h3 className="pt-2">${car.prix}</h3>
                                    
                                </div>

                            </div>
                        </div>
    )
}
