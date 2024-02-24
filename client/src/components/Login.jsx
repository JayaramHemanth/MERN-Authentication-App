import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Login = () => {
     
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate();
   

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('https://mern-server-weld.vercel.app/authentication/login', { email, password })
      .then(result => {
        console.log(result.data);
        if (result.data.success) {
          toast.success(result.data.message)
          console.log(result.data.token)
          localStorage.setItem("token", result.data.token)
          navigate('/');
        } else {
          toast.error(result.data.error);
        }
      })
      .catch(err => console.log(err));
  };
  

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25 m-5'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="Email">
            <strong>Email</strong>
          </label>
          <input type="Email" 
          placeholder='Enter Email'
          name='Email'
          value={email}
          className='form-control rounded-0'
          onChange={e=> setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input type="password" 
          placeholder='Enter Password'
          name='Password'
          value={password}
          className='form-control rounded-0'
          onChange={e=> setPassword(e.target.value)}
          />
        </div>
          <button type='submit' className='btn btn-success w-100'>Login</button>
          <p>forgot password?</p>
          <NavLink to='/signup' className='btn btn-primary w-100'>Register</NavLink>
          </form>
      </div>
    </div>
  )
}

export default Login
