import React from 'react'
import { Route, Routes} from 'react-router-dom'
import { AddEmpPage, EditProfile, Home, Login, Signup } from './pages'
import { PrivateRoutes } from './components'

function App() {

  return (
    <div className='bg-slate-950'>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/addEmployee' element={<AddEmpPage/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
