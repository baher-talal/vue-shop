import Home from './components/Home'
import About from './components/About'
import Checkout from './components/Checkout'
import Hero from './components/Hero'
import Admin from './components/Admin'
import Overview from './components/Overview'
import Product from './components/Product'
import Orders from './components/Orders'
import Profile from './components/Profile'
import ProductList from './components/ProductList'

const routes = [
  {path: '/', component:Home, name:'home'},
  {path:'/About', component:About, name:'about'},
  {path:'/checkout', component:Checkout, name:'checkout'},
  {path:'/Hero', component:Hero, name:'hero'},
  {path:'/Admin', component:Admin, name:'admin', meta: {requiresAuth: true}, children:[
    {path: 'overview', component:Overview, name:'overview'},
    {path: 'product', component:Product, name:'product'},
    {path: 'orders', component:Orders, name:'orders'},
    {path: 'profile', component:Profile, name:'profile'},
  ]},
  {path:'/ProductList', component:ProductList, name:'productList'},
]

export default routes;