/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import './App.css'
import Layout from './Layout'
import LoginPage from './Login'
import RegisterPage from './Register'
import IndexPage from './IndexPage'
import AdminPage from './ADMIN/AdminPage'
import axios from 'axios'
import { UserContext, UserContextProvider } from './userContext'
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
import AdminNotification from './ADMIN/AdminNotification'
import ForgotPass from './forgotPass'
import ResetPass from './resetPass'
import AccessoriesProduct from './MAIN/Accessories'
import SneakerProduct from './MAIN/Sneaker'
import ProductForm from './Orther/productForm'
import UpdateProduct from './ADMIN/updateProduct'
import InventoryProduct from './MAIN/inventory'
import Chat from './ADMIN/AdminChat'
import TestList from './Orther/testChatList'
import { useContext, useEffect, useState } from 'react'
import CustomerManager from './ADMIN/AdminCustomerManage'

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true;


function App() {

  const { user } = useContext(UserContext);

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
          <Route path='/pd/accessories' element={<AccessoriesProduct />} />
          <Route path='/pd/sneaker' element={<SneakerProduct />} />
          <Route path='/pd/sale' element={<InventoryProduct />} />
        </Route>
      </Routes>

      <Routes>
        <Route path='/Product' element={<Product />} />
        {/* <Route  path='/NikeProduct' element={<NikeProduct/>} /> */}
        <Route path='/product/:id' element={<DetailsProduct />} />
        <Route path='/order/:id' element={<OrderPage />} />
        <Route path='/carts' element={<Cart />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-pass' element={<ForgotPass />} />
        <Route path='/reset-pass/:id' element={<ResetPass />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='navigation' element={<NavigationBar />} />
        <Route path='/confirm-order/:id' element={<ConfirmOrder />} />
        <Route path='/test' element={<TestList />} />
      </Routes>

      <Routes>
        <Route path='/wcadmin' element={<Admin />} />
        <Route path='/adminpage' element={<AdminPage />} />
        <Route path='/adminpage/product' element={<AmdinProduct />} />
        <Route path='/adminpage/product/update/:id' element={<AmdinProduct />} />
        <Route path='/adminpage/product/:id' element={<AmdinProduct />} />
        <Route path='/adminpage/order' element={<AdminOrderManage />} />
        <Route path='/adminpage/product/edit' element={<AmdinProduct />} />
        <Route path='/adminpage/notification' element={<AdminNotification />} />
        <Route path='/adminpage/notification/:id' element={<AdminNotification />} />
        <Route path='/adminpage/voucher' element={<Voucher />} />
        <Route path='/adminpage/chat' element={<Chat />} />
        <Route path='/adminpage/chat/:id' element={<Chat />} />
        <Route path='/adminpage/customer' element={<CustomerManager/> }/>
        <Route path='admin-home' element={<AdminHome />} />
      </Routes>
    </UserContextProvider>


  )
}

export default App
