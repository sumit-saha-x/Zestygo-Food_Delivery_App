import React,{useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {APIUrl} from './utils.js';


export default function Login() {
   const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
   let navigate= useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();                  //synthetic event
      console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
      const response = await fetch(`${APIUrl}/api/loginUser`, {                      //Redirect to backend router to perform check
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      })
      const json = await response.json(); // Handle the JSON response
      console.log(json);
      if (!json.success) {
        alert("Enter Valid Credentials"); // Log server error for debugging
      }
      if (json.success) {                         // After login redirect home
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/"); 
      }
    }
    const onChange = (event) => {
      setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
  
  return (
    <div>
       <div className='container'>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to="/createUser" className="m-3 btn btn-danger">I'm a new user</Link>
              </form>
            </div>
    </div>
  )
}
