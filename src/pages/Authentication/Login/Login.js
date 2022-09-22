import React ,{useState}from 'react'
import './Login.css'
import { auth } from '../../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { signInWithPopup,FacebookAuthProvider ,GoogleAuthProvider , TwitterAuthProvider} from "firebase/auth";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // provider.addScope('user_birthday');
  // provider.setCustomParameters({
  //   'display': 'popup'
  // });
  const navigate = useNavigate();
  const loginUser = (e)=>{
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
    setIsLoading(true)
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      navigate("/frontend/")
      toast.success('Login Successfully', {
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

 
  const handlefb = ()=>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth , provider)
    .then((result)=>{
      console.log(result)
      toast.success('Login From FB Successfully', {
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
        console.log(error.message)
    })
  }

  const handleGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth , provider)
    .then((result)=>{
      console.log(result)
      toast.success('Login From Google Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleTwitter = ()=>{
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth,provider)
    .then((result)=>{
      console.log(result)
    }) 
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className='login'>
    <div className='center d-flex justify-content-center align-items-center p-1'>
    <div class="card loginCard">
  <div class="card-body">
    <h1 class="card-title text-center p-4">LOGIN</h1>
    <p class="card-text text-center"> <i  class="fas fa-user" style={{fontSize:"30px",border:'1px ',width:"50px",height:"41px",padding:"6px",backgroundColor:'#f8b500'}}></i><input type="email" style={{height:"41px",paddingTop:'11px',width:'70%'}} placeholder='Email' onChange={e=>{setemail(e.target.value)}}/> </p>
    <p class="card-text text-center"> <i  class="fas fa-lock" style={{fontSize:"30px",border:'1px ',width:"50px",height:"41px",padding:"6px",backgroundColor:'#f8b500'}}></i><input type="password" style={{height:"41px",paddingTop:'11px',width:'70%'}} placeholder='Password' onChange={e=>{setpassword(e.target.value)}}/></p>
    <p className='card-text text-center pt-5'><button  class="btn" type='button' style={{width:"85%",backgroundColor:'#f8b500',borderRadius:0}} onClick={loginUser}>
      {isLoading?
      <div>
      <div class="spinner-border text-dark" role="status">
      <span class="sr-only">Loading...</span>
      </div>
        </div>
      : 
      "LOGIN"
}
      </button></p>
    <p className='card-text text-right pr-4'><Link to='/forgot'  style={{color:'#f8b500', textDecoration:'none'}} >Forgot Password?</Link></p>
    <p className='card-text text-right pr-4'><Link to='/register' style={{color:'#f8b500', textDecoration:'none'}} >Don't Have An Account?</Link></p>
    <p className='card-text text-center pt-5'>
    <i class="fa fa-facebook-square" onClick={handlefb} style={{fontSize:"30px", color:'#f8b500', paddingRight:'50px'}}></i>
    <i class="fa fa-twitter-square" onClick={handleTwitter} style={{fontSize:"30px", color:'#f8b500',paddingRight:'50px'}}></i>
    <i class="fa fa-google" onClick={handleGoogle} style={{fontSize:"30px", color:'#f8b500'}}></i>
    </p>
  </div>
</div>
    </div>
    </div>
  )
}
