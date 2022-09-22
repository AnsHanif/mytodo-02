import React , {useState , useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link,Navigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore/lite'
import { firestore } from '../../config/firebase'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Add() {
  const {isAuthenticated , setisAuthenticated, user} = useContext(AuthContext)
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  
  const [showHomePage, setshowHomePage] = useState(false);
  if (showHomePage) {
    return(
      <Navigate to={{
        pathname:"/frontend/",
      }} />
    )
  }
  const collectionName = 'todos'
  const docCollectionRef = collection(firestore , collectionName)
  const createDoc = async(e)=>{
    e.preventDefault();
    if(!title){
      return  toast.error('Enter The Title ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
      if(!description){
        return  toast.error('Enter The Description ', {
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
    let formData = {title,description, useruid: user.uid,}
    try{
      const docRef = await addDoc(docCollectionRef,formData);
      console.log('ID',docRef.id);
      toast.success('Todo Added successfuly', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setshowHomePage(true)
    }catch(e){
      toast.error('Error', e,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center  min-vh-100'>
      <div className="container">
        <div className="row d-flex">
          <div className="col d-flex justify-content-center">
            <div className="card addcard">
              <div className='card-body text-center'>
                <h1 className='p-4'>TODO LIST</h1>
                <p class="card-text text-center"><input type="text" onChange={e =>{settitle(e.target.value)}} style={{height:"41px",paddingTop:'11px',width:'70%'}} placeholder='Add Title'/></p>
                <p class="card-text text-center"><input type="text" onChange={e =>{setdescription(e.target.value)}} style={{height:"150px",paddingTop:'11px',width:'70%'}} placeholder='Description'/></p>
                <p className='card-text text-center'><button  class="btn" type='button' onClick={createDoc} style={{width:"70%",backgroundColor:'#f8b500',borderRadius:0}}>
                {isLoading?
                <div>
                <div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                  </div>
                  :  
                  (
                    <>
                    <i class="fas fa-plus"></i> Add Todo
                    </>
                    )
              }
              </button>
              </p>
                <p className='card-text text-center'><Link to='/frontend/' style={{color:'#f8b500', textDecoration:'none'}} >Don't Want to Add Todo?</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
