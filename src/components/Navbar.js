import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
                                                        // Replace all a tag with link tag to stop reload  and we write to=(give redirect .js pagecomponent)
import Badge from 'react-bootstrap/Badge';
import Cart from './screens/Cart';
import Modal from './Modal';
import {useCart} from "./ContextReducer"

export default function Navbar() {
  const [cartView,setCartView]= useState(false)
  let data=useCart();
  const navigate=useNavigate();
  
  const handleLogout=()=>{
    localStorage.removeItem("authToken")              ///to logout user
    navigate("/login")
  }

  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">Zestygo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken")) ?                                       //To keep user logged in
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/myOrder">My Orders</Link>
              </li>
              : ""
            }

          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>

              <Link className="btn bg-white text-success mx-1" to="/createUser">SignUp</Link>
            </div>
            :
            <div>
              <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
                My Cart{" "}
                <Badge pill bg='danger'>{data.length}</Badge>
              </div>
                {cartView?<Modal onClose={()=>setCartView(false)}><Cart /></Modal>:null}
              <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
            </div>
          }
        </div>
      </div>
    </nav></div>
  )
}
