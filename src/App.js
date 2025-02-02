import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Home from "./components/screens/Home";
import Login from './components/screens/Login'
import { BrowserRouter, Routes, Route } from "react-router";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from "./components/screens/SignUp.js";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrder from "./components/screens/MyOrder.js";


function App() {
  return (
    <CartProvider>              {/*To make dispach and state for cart in ContextReducer Global*/}
    <BrowserRouter>                                           {/*its a dom extention for stopping nave bar to reload page*/}                  
    <div data-bs-theme="dark">
      <Routes>                                                {/*holds all nave elements*/}
        <Route exact path="/" element={<Home/>} />             
        <Route exact path="/login" element={<Login/>} />     
        <Route exact path="/createUser" element={<SignUp/>} />        
        <Route exact path="/myorder" element={<MyOrder/>} />        
      </Routes>
    </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
