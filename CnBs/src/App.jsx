import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Orders from './components/Orders/Orders'
import History from './components/History/History'
import Login from './components/Login/Login'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        </Routes>      
      </BrowserRouter>
    </div>
  )
}

export default App