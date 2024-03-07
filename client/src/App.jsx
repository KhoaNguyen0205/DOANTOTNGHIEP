/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './Layout'
import LoginPage from './Login'
import RegisterPage from './Register'
import IndexPage from './IndexPage'
import AdminPage from './ADMIN/AdminPage'
import axios from 'axios'
import { UserContextProvider } from './userContext'
import PersonalPage from './MAIN/personal/Personal'
import AdminHome from './ADMIN/AdminHome'
import Admin from './ADMIN/Admin'
import NikeProduct from './MAIN/NikeProduct'
import DetailsProduct from './MAIN/DetailsProduct'
import Cart from './MAIN/Cart'
import OrderPage from './MAIN/Order'
import NavigationBar from './Orther/navbar2'
import Product from './MAIN/Product'
import AmdinProduct from './ADMIN/Product'
import MensProduct from './MAIN/Men\'sProduc'
import Voucher from './ADMIN/Voucher'
import WomenProduct from './MAIN/Women\'sProduct'
import MyAccount from './MAIN/personal/myAccount'
import PucharseOrder from './MAIN/personal/purchaseOrder'
import AdminOrderManage from './ADMIN/AminOrderManage'
import ConfirmOrder from './confirmOrder'

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true;


function App() {

  return (

    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/personal' element={<PersonalPage />} >
            <Route path='/personal/notification' element={<PersonalPage />} />
            <Route path='/personal/voucher' element={<PersonalPage />} />
          </Route>
          <Route path='/personal/account' element={<MyAccount />} />
          <Route path='/personal/pucharse-order' element={<PucharseOrder />} />
          <Route path='/NikeProduct' element={<NikeProduct />} />
          <Route path='/pd/men/' element={<MensProduct />} />
          <Route path='/pd/women/' element={<WomenProduct />} />
        </Route>
      </Routes>

      <Routes>
        <Route path='/Product' element={<Product />} />
        {/* <Route  path='/NikeProduct' element={<NikeProduct/>} /> */}
        <Route path='/product/:id' element={<DetailsProduct />} />
        <Route path='/order/:id' element={<OrderPage />} />
        <Route path='/carts' element={<Cart />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/wcadmin' element={<Admin />} />
        <Route path='/adminpage' element={<AdminPage />} />
        <Route path='/adminpage/product' element={<AmdinProduct />} />
        <Route path='/adminpage/order' element={<AdminOrderManage/>} />
        <Route path='/adminpage/product/edit' element={<AmdinProduct />} />
        <Route path='/adminpage/voucher' element={<Voucher />} />
        <Route path='admin-home' element={<AdminHome />} />
        <Route path='navigation' element={<NavigationBar />} />
        <Route path='/confirm-order/:id' element={<ConfirmOrder />} />
      </Routes>
    </UserContextProvider>

  )
}

export default App
