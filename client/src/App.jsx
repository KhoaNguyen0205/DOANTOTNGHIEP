/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './Layout'
import Navbar from './navbar'
import LoginPage from './Login'
import RegisterPage from './Register'
import IndexPage from './IndexPage'
import AdminPage from './ADMIN/AdminPage'
import axios from 'axios'
import { UserContextProvider } from './userContext'
import PersonalPage from './MAIN/Personal'
import AdminHome from './ADMIN/AdminHome'

axios.defaults.baseURL='http://localhost:4000/'
axios.defaults.withCredentials = true; 


function App() {
  
  return (

   <UserContextProvider>
     <Routes>
       <Route path='/' element={<Layout/>}>
           <Route index element={<IndexPage/>}/>
           <Route path='/personal' element={<PersonalPage/>} />
       </Route>
     </Routes>
    
     <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/adminpage' element={<AdminPage/>} />
        <Route path='admin-home'  element={<AdminHome/>} />
     </Routes>
   </UserContextProvider>
   
  )
}

export default App
