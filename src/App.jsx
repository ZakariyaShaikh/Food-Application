import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import Home from './screens/Home'
import Login from './screens/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Signup from './screens/Signup';
import { CartProvider } from './components/ContexReducer';
import MyOrder from './screens/MyOrder';

function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
