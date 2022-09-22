import React,{useState} from 'react'
import '../Register/Register.css'
import './Forgot.css'
import {  sendPasswordResetEmail } from "firebase/auth"
import { auth } from '../../../config/firebase'
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
export default function Forgot() {
  const [email, setemail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const resetPassword = (e)=>{
    if(!email){
      return toast.error('Please Enter the Email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success('Password reset email sent, Check Email in Spams', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(`Error ${errorMessage}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    // ..
  }).finally(()=>{
    setIsLoading(false)
  }) 
  }
  return (
    <div className='login'>
    <div className='center d-flex justify-content-center align-items-center p-1'>
    <div class="card forgotCard">
  <div class="card-body">
    <h2 class="card-title text-center p-4 pb-5"><span className='text-warning'>RESET PASSWORD</span></h2>
    <p class="card-text text-center"> <i  class="fas fa-user" style={{fontSize:"30px",border:'1px ',width:"50px",height:"41px",padding:"6px",backgroundColor:'#f8b500'}}></i><input type="text" style={{height:"41px",paddingTop:'11px',width:'70%'}} placeholder='Email' onChange={e =>{setemail(e.target.value)}}/> </p>
    <p className='card-text text-center pt-5'><button  class="btn" type='button' style={{width:"85%",backgroundColor:'#f8b500',borderRadius:0}} onClick={resetPassword}>
    {isLoading?
      <div>
      <div class="spinner-border text-dark" role="status">
      <span class="sr-only">Loading...</span>
      </div>
        </div>
      : 
      (
        <>
        Send <i class="fas fa-arrow-right"></i>
        </>
      )
      }   
    </button></p>
    <p className='card-text text-right pr-4'><Link to='/' style={{color:'#f8b500', textDecoration:'none'}} >Back To Login?</Link></p>
  </div>
</div>
    </div>
    </div>
  )
}
