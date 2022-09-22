import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './Add'
import Completes from './Completes'
import Favourites from './Favourites'
import Home from './Home'

export default function index() {
  return (
    <>
    <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/add' element={<Add />} />
       <Route path='/favourites' element={<Favourites />} />
       <Route path='/completes' element={<Completes />} />
    </Routes>
    </>
  )
}
