import React , {useState , useContext} from 'react'
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Frontend from '../pages/Frontend'
import Forgot from './Authentication/Forgot';
import PrivateRoute from './important/PrivateRoute'
import { AuthContext } from './context/AuthContext';
export default function Index() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/frontend/" element={<Frontend />}/>}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/forgot" element={<Forgot />}/>
      <Route path='/frontend/*' element={<PrivateRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
