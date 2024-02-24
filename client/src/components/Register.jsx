import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink,useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    axios.post('https://mern-server-weld.vercel.app/authentication/signup', { name, email, password })
      .then(() => {
        toast.success('User created successfully');
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    navigate && (
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25 m-5'>
          <h2>Register User</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder='Enter Name'
                name='name'
                value={name}
                className='form-control rounded-0'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="Email">
                <strong>Email</strong>
              </label>
              <input
                type="Email"
                placeholder='Enter Email'
                name='Email'
                value={email}
                className='form-control rounded-0'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="age">
                <strong>password</strong>
              </label>
              <input
                type="password"
                placeholder='Enter password'
                name='password'
                value={password}
                className='form-control rounded-0'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-success w-100'>Register</button>
            <p>Already have an Account</p>
            <NavLink to='/login' className='btn btn-primary w-100'>Login</NavLink>
          </form>
        </div>
      </div>
    )
  );
};

export default Register;
