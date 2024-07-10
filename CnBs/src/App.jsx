import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Orders from './components/Orders/Orders'
import History from './components/History/History'
import Login from './components/Login/Login'
import Admin from './components/Admin/Admin'
import Home from './components/Admin/Home'
import Stats from './components/Admin/Stats'
import Settings from './components/Admin/Settings'
import User from './components/Admin/User'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route index element={<Login/>}></Route> */}

        {/* <Route path='/admin' element={<Admin/>}>
          <Route path='' element={<Home />} ></Route>
          <Route path='/admin/stats' element={<Stats />} ></Route>
          <Route path='/admin/user' element={<User />} ></Route>
          <Route path='/admin/settings' element={<Settings />} ></Route>
        </Route> */}

        <Route path='/' element={<Orders/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        </Routes>      
      </BrowserRouter>
    </div>
  )
}

export default App