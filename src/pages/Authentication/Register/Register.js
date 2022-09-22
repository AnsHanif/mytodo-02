import React,{useState} from 'react'
import './Register.css'
import { auth } from '../../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
export default function Register() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const registerUser = (e)=>{
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
    if(!password){
      return toast.error('Please Enter the Password', {
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
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential;
      navigate("/frontend/")
      toast.success('You are Registered Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error)=>{
      toast.error(`Error${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  return (
    <div className='login'>
    <div className='center d-flex justify-content-center align-items-center p-1'>
    <div class="card registerCard">
  <div class="card-body">
    <h1 class="card-title text-center p-4">Register</h1>
    <p class="card-text text-center"> <i  class="fas fa-user" style={{fontSize:"30px",border:'1px ',width:"50px",height:"41px",padding:"6px",backgroundColor:'#f8b500'}}></i><input type="text" style={{height:"41px",paddingTop:'11px',width:'70%'}} placeholder='Email' onChange={e =>{setemail(e.target.value)}}/> </p>
    <p class="card-text text-center"> <i  class="fas fa-lock" style={{fontSize:"30px",border:'1px ',width:"50px",height:"41px",padding:"6px",backgroundColor:'#f8b500'}}></i><input type="password" style={{height:"41px",paddingTop:'11px',width:'70%'}} placeholder='Password'onChange={e =>{setpassword(e.target.value)}} /></p>
    <p className='card-text text-center pt-5'><button  class="btn" type='button' style={{width:"85%",backgroundColor:'#f8b500',borderRadius:0}} onClick={registerUser}>
    {isLoading?
      <div>
      <div class="spinner-border text-dark" role="status">
      <span class="sr-only">Loading...</span>
      </div>
        </div>
      : "REGISTER"}   
    </button></p>
    <p className='card-text text-right pr-4'><Link to='/' style={{color:'#f8b500', textDecoration:'none'}} >Already Have An Account?</Link></p>
    {/* <p className='card-text text-center pt-5'>
    <i class="fa fa-facebook-square" style={{fontSize:"30px", color:'#f8b500', paddingRight:'50px'}}></i>
    <i class="fa fa-twitter-square" style={{fontSize:"30px", color:'#f8b500',paddingRight:'50px'}}></i>
    <i class="fa fa-google" style={{fontSize:"30px", color:'#f8b500'}}></i>
    </p> */}
  </div>
</div>
    </div>
    </div>
  )
}
