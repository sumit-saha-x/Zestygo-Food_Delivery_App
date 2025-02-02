import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {APIUrl} from './utils.js';

export default function SignUp() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload
    
    try {
      const response = await fetch(`${APIUrl}/api/createUser`, {  // Redirect to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: credentials.name, 
          email: credentials.email, 
          password: credentials.password, 
          location: credentials.geolocation 
        })
      });

      const json = await response.json(); // Get the response
      console.log(json);

      if (!response.ok) { 
        alert(json.message);  // 🚀 **Show error message (like "Email already exists")**
        return;
      }

      alert("Signup successful! Please login.");  // ✅ Success message
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
        </form>
        
        <div id="loginHelp" className="mt-4 form-text">Note: After SignUp, move to "Already a user" for Login.</div>
      </div>
    </>
  )
}
