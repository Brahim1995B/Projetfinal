import {react,useState} from 'react';
import singnInImage from '../../assets/images/logo.png';
import styles from './signupStyle/style.module.css'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../Redux/Actions/AuthActions"


export default function SignIn (){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
     const handleLogin = (a)=>{
        console.log(a)
      a.preventDefault()
      dispatch(login({email,password},navigate))
  
     }
    return ( 
        <div className={styles.container}>
                <div className={styles.signin_content}>
                    <div className={styles.signin_image}>
                        <figure><img src={singnInImage} alt="sing up image"/></figure>
                        <a href="/signup" className="signup-image-link">Create an account</a>
                    </div>

                    <div className={styles.signin_form}>
                        <h2 className={styles.form_title}>Sign in</h2>
                        <div  className={styles.register_form} >
                            <div className={styles.form_group}>
                                <label for="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" name="your_name" id="your_name" placeholder="Email"/>
                            </div>
                            <div className={styles.form_group}>
                                <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="your_pass" id="your_pass" placeholder="Mot de passe"/>
                            </div>
                            <div className={styles.form_group}>
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div className={styles.form_group}>
                                <input onClick={(e)=>handleLogin(e)} type="submit" name="signin" id="signin" className={styles.form_submit} value="Log in"/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}