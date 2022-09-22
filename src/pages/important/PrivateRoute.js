import React , { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Login from '../Authentication/Login'
import Frontend from "../Frontend"
export default function PrivateRoute(props) {

 const {isAuthenticated} = useContext(AuthContext)
 console.log(props)
 console.log(isAuthenticated)

 if(!isAuthenticated)
 return <Login />
  return (
    <Frontend />
  )
}
